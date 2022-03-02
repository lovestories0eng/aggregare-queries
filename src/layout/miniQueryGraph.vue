<template>
  <!-- vis关系图基础展示 -->
  <div id="mini-query-graph">
    <!--width,height 画布的宽度，高度。 可以是百分比或像素，一般在dom元素上设置 -->
    <div id="query-graph-mini" class="network cancel" style="width:290px;height:38px;border:1px solid #ccc;color: #ffff"></div>
  </div>
</template>

<script>
import { options } from "utils";
import Vis from "vis-network/dist/vis-network.min.js"
export default {
  name: "miniQueryGraph",
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
      // 可视化参数设置
      options: options,
    };
  },
  watch: {
    graphData(newValue) {
      this.edgesArray = []
      this.nodesArray = []
      this.nodesArray = [{id: 1, name: newValue[2], color: '#FFC1C1', x: -100, y: 0}, {id: 2, name: newValue[0], color: '#FFD39B', x: 100, y: 0}]
      this.edgesArray.push({from: 1, to: 2, label: newValue[1], color: '#0070c0'})
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
      this.network.moveTo({ scale: 0.85 });
      let param = { nodes: this.nodesArray, edges: this.edgesArray };
      this.addNetworkParams(param)
    },
    // 初始化network
    init(nodes, edges) {
      // 3.创建一个网络拓扑图
      this.container = document.getElementById("query-graph-mini");
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
</style>
