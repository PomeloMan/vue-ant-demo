<template>
  <div>
    <div class="mxgraph-container"></div>
    <div class="mxgraph-outline-container"></div>
  </div>
</template>

<script>
/* eslint-disable */
import {
  mxClient,
  mxUtils,
  mxEvent,
  mxGraph,
  mxOutline,
  mxCompactTreeLayout,
  mxCellOverlay,
  mxImage,
  mxConstants,
  mxPoint,
  mxVertexHandler,
  mxEdgeHandler,
  graph
} from '../mxgraph/index'
export default {
  data() {
    return {
      container: null,
      graph: null,
      keyHandler: null,
      layout: null,
      outlineContainer: null,
      outline: null
    }
  },
  created() {
    // 点击图形编辑状态下显示的各个点
    mxVertexHandler.prototype.handleImage = graph.mainHandle
    mxVertexHandler.prototype.secondaryHandleImage = graph.secondaryHandle
    mxEdgeHandler.prototype.handleImage = graph.mainHandle
    mxEdgeHandler.prototype.terminalHandleImage = graph.terminalHandle
    mxEdgeHandler.prototype.fixedHandleImage = graph.fixedHandle
    mxEdgeHandler.prototype.labelHandleImage = graph.secondaryHandle
    mxOutline.prototype.sizerImage = graph.mainHandle
    // 图形是否可以旋转，默认false
    mxVertexHandler.prototype.rotationEnabled = true
    // 图形较小时是否隐藏显示部分图形大小调整器
    mxVertexHandler.prototype.manageSizers = true
    // 是否实时修改图形大小，默认false
    mxVertexHandler.prototype.livePreview = true
  },
  mounted() {
    // Checks if browser is supported
    if (!mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mxUtils.error(this.$t('message.browser_not_supported'), 200, false)
    } else {
      this.container = document.querySelector('.mxgraph-container')
      this.outlineContainer = document.querySelector(
        '.mxgraph-outline-container'
      )
      // 取消默认右击菜单
      mxEvent.disableContextMenu(this.container)
      const graph = new mxGraph(this.container)
      graph.setCellsMovable(true) // 模型可移动
      graph.setAutoSizeCells(true) // 自动更新模型大小
      // graph.setConnectable(true)
      graph.setPanning(true) // 画布可移动

      var style = graph.getStylesheet().getDefaultVertexStyle()
      style[mxConstants.STYLE_ROUNDED] = true
      style[mxConstants.STYLE_FILLCOLOR] = '#ffffff' // 填充颜色色
      style[mxConstants.STYLE_STROKECOLOR] = '#000000' // 边框颜色
      style[mxConstants.STYLE_STROKEWIDTH] = '1' // 边框宽
      style[mxConstants.STYLE_FONTCOLOR] = '#000000' // 文字颜色
      style[mxConstants.STYLE_FONTSIZE] = '12'
      style[mxConstants.VALID_COLOR] = '#000000' // 有效的连接线
      style[mxConstants.INVALID_COLOR] = '#f5222d' // 无效的连接线
      graph.getStylesheet().putDefaultVertexStyle(style)

      // 总览窗口
      this.outline = new mxOutline(graph, this.outlineContainer)
      // Enables automatic layout on the graph and installs
      // a tree layout for all groups who's children are
      // being changed, added or removed.
      this.layout = new mxCompactTreeLayout(graph, false)
      this.layout.levelDistance = 60
      this.layout.nodeDistance = 16

      const parent = graph.getDefaultParent()
      graph.getModel().beginUpdate()
      try {
        var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30)
        var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30)
        // eslint-disable-next-line
        var e1 = graph.insertEdge(parent, null, '', v1, v2, 'strokeColor=#000000')
      } finally {
        graph.getModel().endUpdate()
      }

      this.graph = graph
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.mxgraph-container {
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.mxgraph-outline-container {
  z-index: 1;
  position: absolute;
  overflow: hidden;
  top: 0px;
  right: 0px;
  width: 160px;
  height: 120px;
  background: transparent;
  border-style: solid;
  border-color: lightgray;
}
</style>