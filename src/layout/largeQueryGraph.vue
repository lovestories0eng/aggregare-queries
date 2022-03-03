<template>
  <!-- vis关系图基础展示 -->
  <div>
    <!--width,height 画布的宽度，高度。 可以是百分比或像素，一般在dom元素上设置 -->
    <!--<div id="selected-query-graph" class="network" style="width: 100%;height: 200px;border:1px solid #ccc;"></div>-->
    <div id="query-graph-large" class="network" style="width:100%;height:350px;border:1px solid #ccc;"></div>
  </div>
</template>

<script>
import { options } from "utils";
import Vis from "vis-network/dist/vis-network.min.js"
export default {
  name: "LargeQueryGraph",
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
      // 可视化参数设置
      options: options,
      tags: []
    };
  },
  watch: {
    graphData(newValue) {
      this.edgesArray = []
      this.nodesArray = []
      this.tags = []
      for (let i=0;i<newValue.length && i < 100;i++) {
        let from = newValue[i][0]
        let to = newValue[i][1]
        if (this.tags.indexOf(from) === -1) {
          this.tags.push(from)
          this.nodesArray.push({id: from, name: newValue[i][2]})
        }
        if (this.tags.indexOf(to) === -1) {
          this.tags.push(to)
          this.nodesArray.push({id: to, name: newValue[i][4]})
        }
        this.edgesArray.push({from, to, label: newValue[i][3]})
      }
      console.log()
      this.reinitialize()
    }
  },
  mounted() {
    this.reinitialize()
  },
  methods: {
    reinitialize() {
      //1.创建一个nodes对象
      this.nodes = new Vis.DataSet([]);
      //2.创建一个edges对象
      this.edges = new Vis.DataSet([]);
      this.init(this.nodes, this.edges);
      this.network.moveTo({ scale: 0.25 });
      let param = { nodes: this.nodesArray, edges: this.edgesArray };
      this.addNetworkParams(param)
    },
    // 初始化network
    init(nodes, edges) {
      // 3.创建一个网络拓扑图
      this.container = document.getElementById("query-graph-large");
      // 4.创建data对象
      this.data = {
        nodes: nodes,
        edges: edges,
      }
      // 6.初始化网络拓扑图
      this.network = new Vis.Network(this.container, this.data, this.options)
    },
    //扩展节点 增加nodes和edges集合参数
    addNetworkParams(param) {
      //添加节点
      for (let i = 0; i < param.nodes.length; i++) {
        let node = param.nodes[i]
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

/*/deep/ .vis-up {*/
/*  top: 10px !important;*/
/*}*/

/*/deep/ .vis-down {*/
/*  top: 50px !important;*/
/*}*/

/*/deep/ .vis-left {*/
/*  top: 50px !important;*/
/*}*/

/*/deep/ .vis-right {*/
/*  top: 50px !important;*/
/*}*/

/*/deep/ .vis-zoomIn {*/
/*  top: 50px !important;*/
/*}*/

/*/deep/ .vis-zoomOut {*/
/*  top: 50px !important;*/
/*}*/

/*/deep/ .vis-zoomExtends {*/
/*  top: 10px !important;*/
/*}*/
</style>
