<template>
  <!-- vis关系图基础展示 -->
  <div>
    <!--width,height 画布的宽度，高度。 可以是百分比或像素，一般在dom元素上设置 -->
    <div id="selected-query-graph" class="network" style="width: 100%;height: 200px;border:1px solid #ccc;"></div>
    <div id="query-graph" class="network" style="width:100%;height:450px;border:1px solid #ccc;">
    </div>
  </div>
</template>

<script>
// import Vis from "vis"
import {options} from "utils";
import Vis from "vis-network/dist/vis-network.min.js"
export default {
  name: "QueryGraph",
  props: {
    graphData: {
      type: Array,
      default() {
        return []
      }
    },
    selectedSample: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      nodes: [],
      edges: [],
      container: null,
      // network: null,
      // 节点数组
      nodesArray: [],
      edgesArray: [],
      originArray: [],
      options: options,
      data: {},
      sampleMapId: {},
      idCount: 1,
      // 最多显示100条路径
      pathLimit: 100,
      selectedPath: []
    };
  },
  watch: {
    // 所选择地样本名称
    selectedSample(newValue) {
      for (let i=0;i<this.originArray.length;i++) {
        if (this.originArray[i].path[0] === newValue) {
          // 所选择的样本的查询路径
          this.selectedPath = this.originArray[i].path
          console.log(this.selectedPath)
          break
        }
      }
    },
    graphData(newValue) {
      this.originArray = newValue
      this.nodesArray = []
      this.edgesArray = []
      this.sampleMapId = {}
      this.idCount = 1
      // 数据量过大则进行样本裁剪
      // newValue = this.dataCut(newValue, this.pathLimit)
      newValue.forEach(item => {
        let paths = item.path
        let count = 1
        for (let i=0;i<paths.length;i++) {
          let tempKey = paths[i]
          if (this.sampleMapId[tempKey] === undefined && count % 2 === 1) {
            this.sampleMapId[tempKey] = this.idCount
            this.nodesArray.push({ id: this.idCount, name: tempKey })
            this.idCount++
          }
          count++
        }
        count = 1
        for (let i=0;i<paths.length;i++) {
          if (count % 2 === 0) {
            let next = this.sampleMapId[paths[i - 1]]
            let previous = this.sampleMapId[paths[i + 1]]
            if (this.edgesArray.length === 0) {
              this.edgesArray.push({ from: previous, to: next, label:paths[i] })
            } else {
              let flag = true
              for (let j=0;j<this.edgesArray.length;j++) {
                if (next === (this.edgesArray[j]).to && previous === (this.edgesArray[j]).from) {
                  flag = false
                  break
                }
              }
              if (flag) {
                this.edgesArray.push({ from: previous, to: next, label:paths[i] })
                if (i === paths.length - 2) {
                  this.nodesArray.forEach(item => {
                    if (item.id === previous) {
                      item.group = 'startPoint'
                    }
                  })
                }
              }
            }
          }
          count++
        }
      })
      // for debug
      // console.log(this.nodesArray)
      // console.log(this.edgesArray)
      this.reinitialize()

    }
  },
  mounted() {
    this.reinitialize()
  },
  methods: {
    // 路径过多则裁剪相应数据
    dataCut(pathArray, length) {
      if (pathArray.length <= length) {
        return pathArray
      } else {
        this.$message.warning('There are too many paths, and some paths have been cut out for better display.')
        let index = 0
        let newArray = []
        for (let index=0;index<length;index++) {
          newArray.push(pathArray[index])
        }
        return newArray
      }
    },
    reinitialize() {
      //1.创建一个nodes对象
      this.nodes = new Vis.DataSet([]);
      //2.创建一个edges对象
      this.edges = new Vis.DataSet([]);
      this.init(this.nodes, this.edges);
      this.network.moveTo({ scale: 0.85 });
      let param = { nodes: this.nodesArray, edges: this.edgesArray };
      this.addNetworkParams(param)
    },
    // 初始化network
    init(nodes, edges) {
      // 3.创建一个网络拓扑图
      this.container = document.getElementById("query-graph");
      // 4.创建data对象
      this.data = {
        nodes: nodes,
        edges: edges,
      }
      // 6.初始化网络拓扑图
      this.network = new Vis.Network(this.container, this.data, this.options);
    },
    //扩展节点 增加nodes和edges集合参数
    addNetworkParams(param) {
      //添加节点
      for (let i = 0; i < param.nodes.length; i++) {
        let node = param.nodes[i];
        this.nodes.add({
          label: node.name,
          ...node,
        });
      }
      //添加关系
      for (let i = 0; i < param.edges.length; i++) {
        let edge = param.edges[i];
        this.edges.add({
          ...edge,
        });

      }
    },
  },
}
</script>

<style scoped>
.network {
  float: left;
  margin-top: 15px;
}
</style>
