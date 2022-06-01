export const optionsSpecial = {
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
    enabled: true, //默认是true，设置为false后，节点将不会自动改变，拖动谁谁动。不影响其他的节点
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
