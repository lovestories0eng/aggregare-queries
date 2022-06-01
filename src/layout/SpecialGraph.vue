<template>
  <!-- vis关系图基础展示 -->
  <div id="special-query-graph">
    <div style="position: relative; width:100%;height:450px !important;">
      <div v-if="queryType.length !== 0" class="type">{{ queryType }}</div>
      <!--width,height 画布的宽度，高度。 可以是百分比或像素，一般在dom元素上设置 -->
      <div id="special-graph" class="network cancel" style="width:100%;height:450px !important;border:1px solid #ccc;color: #ffff"></div>
    </div>
  </div>
</template>

<script>

import Vis from "vis-network/dist/vis-network.min.js"
export default {
  name: "miniQueryGraph",
  props: {
    graphData: {
      type: Array,
      default() {
        return []
      }
    },
    queryType: {
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
      options: {
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
            background: "#fff", //节点背景颜色
            highlight: {
              //节点选中时状态颜色
              border: "#fff",
              background: "rgb(117, 218, 167)",
            },
            hover: {
              //节点鼠标滑过时状态颜色
              border: "#fff",
              background: "#88dab1",
            },
          },
          margin: 5, //当形状设置为box、circle、database、icon、text；label的边距
          widthConstraint: 130, //设置数字，将节点的最小和最大宽度设为该值,当值设为很小的时候，label会换行，节点会保持一个最小值，里边的内容会换行
          borderWidth: 1, //节点边框宽度，单位为px
          borderWidthSelected: 3, //节点被选中时边框的宽度，单位为px
        },
        // 边线配置
        edges: {
          width: 1,
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
          stabilization: true,
          enabled: false, //默认是true，设置为false后，节点将不会自动改变，拖动谁谁动。不影响其他的节点
          barnesHut: {
            gravitationalConstant: -12000,
            centralGravity: 0.2,
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
            speed: {x: 10, y: 10, zoom: 0.05},
            bindToWindow: true,
          },
          multiselect: false,
          navigationButtons: true,
          selectable: true,
          selectConnectedEdges: true,
          tooltipDelay: 300,
          zoomView: true
        },
      }
    };
  },
  created() {
    this.nodesArray = [
      {id: 1, name: 'California', x: -400, y: 300, color: '#FFC1C1' },
      {id: 2, name: 'company', x: -100, y: 300, color: 'lightblue'},
      {id: 3, name: '?(software)', x: 200, y: 300, color: '#FFD39B' },
      {id: 4, name: 'California', x: -400, y: 200, color: '#FFC1C1' },
      {id: 5, name: 'company', x: -100, y: 200, color: 'lightblue' },
      {id: 6, name: '?(software)', x: 200, y: 200, color: '#FFD39B' },
      {id: 7, name: 'California', x: -400, y: 100, color: '#FFC1C1' },
      {id: 8, name: 'company', x: -100, y: 100, color: 'lightblue' },
      {id: 9, name: '?(software)', x: 200, y: 100, color: '#FFD39B' },
      {id: 10, name: 'California', x: -400, y: 0, color: '#FFC1C1' },
      {id: 11, name: 'company', x: -100, y: 0, color: 'lightblue' },
      {id: 12, name: '?(software)', x: 200, y: 0, color: '#FFD39B' },
      {id: 13, name: 'California', x: -400, y: -100, color: '#FFC1C1' },
      {id: 14, name: 'company', x: -100, y: -100, color: 'lightblue' },
      {id: 15, name: '?(software)', x: 200, y: -100, color: '#FFD39B' },

      {id: 16, name: '0.97', x: 350, y: 300 },
      {id: 17, name: '0.90', x: 350, y: 200 },
      {id: 18, name: '0.85', x: 350, y: 100 },
      {id: 19, name: '0.88', x: 350, y: 0 },
      {id: 20, name: '0.95', x: 350, y: -100 },
      {id: 21, name: 'Schema5', x: -100, y: 270 },
      {id: 22, name: 'Schema4', x: -100, y: 170 },
      {id: 23, name: 'Schema3', x: -100, y: 70 },
      {id: 24, name: 'Schema2', x: -100, y: -30 },
      {id: 25, name: 'Schema1', x: -100, y: -130 },

      {id: 26, name: 'Semantically similarity', x: 250, y: 70 },

    ]
    this.edgesArray = [
      { from: 1, to: 2, label: 'foundationPlace' },
      { from: 2, to: 3, label: 'product' },
      { from: 4, to: 5, label: 'foundationPlace' },
      { from: 5, to: 6, label: 'developer' },
      { from: 7, to: 8, label: 'foundationPlace' },
      { from: 8, to: 9, label: 'industry' },
      { from: 10, to: 11, label: 'foundationPlace' },
      { from: 11, to: 12, label: 'computingPlatform' },
      { from: 13, to: 14, label: 'foundationPlace' },
      { from: 14, to: 15, label: 'author' },
    ]
  },
  mounted() {
    this.reinitialize()
  },
  methods: {
    initPosition(nodes) {

    },
    reinitialize() {
      //1.创建一个nodes对象
      this.nodes = new Vis.DataSet([]);
      //2.创建一个edges对象
      this.edges = new Vis.DataSet([]);
      this.init(this.nodes, this.edges);
      this.network.moveTo({ scale: 0.58 });
      let param = { nodes: this.nodesArray, edges: this.edgesArray };
      this.addNetworkParams(param)
    },
    // 初始化network
    init(nodes, edges) {
      // 3.创建一个网络拓扑图
      this.container = document.getElementById("special-graph");
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

.cancel {
  margin-top: 0 !important;
}

/deep/ .vis-up {
  display: none !important;
}

/deep/ .vis-down {
  display: none !important;
}

/deep/ .vis-left {
  display: none !important;
}

/deep/ .vis-right {
  display: none !important;
}

/deep/ .vis-zoomIn {
  display: none!important;
}

/deep/ .vis-zoomOut {
  display: none !important;
}

/deep/ .vis-zoomExtends {
  display: none !important;
}

.type {
  font-size: 12px !important;
  font-weight: 600;
  top: 1px;
  left: 155px;
  position: absolute;
  color: #EA3F3F;
  z-index: 999;
}
</style>
