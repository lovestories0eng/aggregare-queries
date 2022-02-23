<template>
  <!-- vis关系图基础展示 -->
  <div>
    <!--width,height 画布的宽度，高度。 可以是百分比或像素，一般在dom元素上设置 -->
    <div id="query-graph" class="network" style="width:100%;height:450px;border:1px solid #ccc;">
    </div>
  </div>
</template>

<script>
// import Vis from "vis"
import Vis from "vis-network/dist/vis-network.min.js"
export default {
  name: "QueryGraph",
  props: {
    graphData: {
      type: Array,
      default() {
        return []
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
      options: {},
      data: {},
      sampleMapId: {},
      idCount: 1,
      // 最多显示120条路径
      pathLimit: 100
    };
  },
  watch: {
    graphData(newValue) {
      this.nodesArray = []
      this.edgesArray = []
      this.sampleMapId = {}
      this.idCount = 1
      newValue = this.dataCut(newValue, this.pathLimit)
      console.log(newValue)
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
      // console.log(this.nodesArray)
      // console.log(this.edgesArray)
      this.reinitialize()

    }
  },
  mounted() {
    this.reinitialize()
  },
  methods: {
    // // 找出nodesArray中的起始点的id
    // determineInitialPoint(nodesArray) {
    //   let length = nodesArray.length
    //   for (let index=0;index<length;index++) {
    //     if ((nodesArray[index]).group !== undefined) {
    //       return (nodesArray[index]).id
    //     }
    //   }
    // },
    // // 构建邻接链表
    // buildAdjacencyList(edgesArray) {
    //
    // },
    // // 深度优先搜索找出所有样本
    // deepFirstSearch(node) {
    //
    // },
    // 路径过多则裁剪相应数据
    dataCut(pathArray, length) {
      if (pathArray.length <= length) {
        return pathArray
      } else {
        let index = 0
        let newArray = []
        for (let index=0;index<length;index++) {
          newArray.push(pathArray[index])
        }
        return newArray
      }
    },
    reinitialize() {
      this.init();
      this.network.moveTo({ scale: 0.85 });
      let param = { nodes: this.nodesArray, edges: this.edgesArray };
      this.addNetworkParams(param)
    },
    // 初始化network
    init() {
      //1.创建一个nodes对象
      this.nodes = new Vis.DataSet([]);
      //2.创建一个edges对象
      this.edges = new Vis.DataSet([]);
      // 3.创建一个网络拓扑图
      this.container = document.getElementById("query-graph");
      // 4.创建data对象
      this.data = {
        nodes: this.nodes,
        edges: this.edges,
      };
      // 5.全局配置
      //该配置项主要用来生成一个可视化的配置器
      this.options = {
        autoResize: true, //网络将自动检测其容器的大小调整，并相应地重绘自身
        // 设置节点样式
        nodes: {
          shape: "ellipse", //节点的外观。为circle时label显示在节点内，为dot时label显示在节点下方
          size: 18, //节点的大小，
          shadow: false, //如果为true，则节点使用默认设置投射阴影。
          font: {
            //字体配置
            size: 12,
            color: "black",
            align: "center",
          },
          color: {
            border: "transparent", //节点边框颜色
              background: "#eee", //节点背景颜色
              highlight: {
              //节点选中时状态颜色
              border: "rgb(117, 218, 167)",
              background: "rgb(117, 218, 167)",
            },
            hover: {
              //节点鼠标滑过时状态颜色
              border: "#dff9fb",
              background: "#88dab1",
            },
          },
          margin: 5, //当形状设置为box、circle、database、icon、text；label的边距
          widthConstraint: 100, //设置数字，将节点的最小和最大宽度设为该值,当值设为很小的时候，label会换行，节点会保持一个最小值，里边的内容会换行
          borderWidth: 1, //节点边框宽度，单位为px
          borderWidthSelected: 3, //节点被选中时边框的宽度，单位为px
        },
        // 边线配置
        edges: {
          width: 1,
          length: 100,
          color: {
            color: "#848499",
            highlight: "rgb(117, 218, 167)",
            hover: "#88dab1",
            inherit: "from",
            opacity: 1.0,
          },
          font: {
            color: "#343434",
            size: 12, // px
            face: "arial",
            background: "none",
            strokeWidth: 2, // px
            strokeColor: "#ffffff",
            align: "horizontal",
            multi: false,
            vadjust: 0,
            bold: {
              color: "#343434",
              size: 12, // px
              face: "arial",
              vadjust: 0,
              mod: "bold",
            },
            ital: {
              color: "#343434",
              size: 12, // px
              face: "arial",
              vadjust: 0,
              mod: "italic",
            },
            boldital: {
              color: "#343434",
              size: 12, // px
              face: "arial",
              vadjust: 0,
              mod: "bold italic",
            },
            mono: {
              color: "#343434",
              size: 12, // px
              face: "courier new",
              vadjust: 2,
              mod: "",
            },
          },
          shadow: false,
          smooth: {
            //设置两个节点之前的连线的状态
            enabled: true, //默认是true，设置为false之后，两个节点之前的连线始终为直线，不会出现贝塞尔曲线
          },
          arrows: { to: true }, //箭头指向to
        },
        // 布局
        //物理引擎-计算节点之前斥力，进行自动排列的属性
        physics: {
          enabled: true, //默认是true，设置为false后，节点将不会自动改变，拖动谁谁动。不影响其他的节点
          barnesHut: {
            gravitationalConstant: -4000,
            centralGravity: 0.3,
            springLength: 120,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0,
          },
        },
        //用于所有用户与网络的交互。处理鼠标和触摸事件以及导航按钮和弹出窗口
        interaction: {
          dragNodes: true,
          dragView: true,
          hideEdgesOnDrag: false,
          hideNodesOnDrag: false,
          hover: false,
          hoverConnectedEdges: true,
          keyboard: {
            enabled: true,
            speed: {x: 10, y: 10, zoom: 0.02},
            bindToWindow: true,
          },
          multiselect: false,
          navigationButtons: true,
          selectable: true,
          selectConnectedEdges: true,
          tooltipDelay: 300,
          zoomView: true
        },
      };
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
#query-graph {
  float: left;
}
</style>
