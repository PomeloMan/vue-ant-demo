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
  mxConnectionConstraint,
  mxCellState,
  mxRubberband,
  mxKeyHandler
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
    mxVertexHandler.prototype.rotationEnabled = true // 图形是否可以旋转，默认false
    mxVertexHandler.prototype.manageSizers = true // 图形较小时是否隐藏显示部分图形大小调整器
    mxVertexHandler.prototype.livePreview = true // 是否实时修改图形大小，默认false
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
      graph.setConnectable(true) // 图形可连接
      graph.setPanning(true) // 画布可移动
      // 开启区域选择，鼠标框选
      new mxRubberband(graph)

      // 图形默认样式
      const vertexStyle = graph.getStylesheet().getDefaultVertexStyle()
      vertexStyle[mxConstants.STYLE_ROUNDED] = true
      vertexStyle[mxConstants.STYLE_FILLCOLOR] = '#ffffff' // 填充颜色色
      vertexStyle[mxConstants.STYLE_STROKECOLOR] = '#000000' // 边框颜色
      vertexStyle[mxConstants.STYLE_STROKEWIDTH] = '1' // 边框宽
      vertexStyle[mxConstants.STYLE_FONTCOLOR] = '#000000' // 文字颜色
      vertexStyle[mxConstants.STYLE_FONTSIZE] = '12'
      graph.getStylesheet().putDefaultVertexStyle(vertexStyle)
      // 连接线默认样式
      const edgeStyle = graph.getStylesheet().getDefaultEdgeStyle()
      edgeStyle[mxConstants.STYLE_EDGE] = 'orthogonalEdgeStyle'
      graph.getStylesheet().putDefaultEdgeStyle(edgeStyle)

      // 禁用浮动连接（仅在不使用连接映像的情况下使用）
      if (graph.connectionHandler.connectImage == null) {
        graph.connectionHandler.isConnectableCell = function(cell) {
          return false
        }
        mxEdgeHandler.prototype.isConnectableCell = function(cell) {
          return graph.connectionHandler.isConnectableCell(cell)
        }
      }
      // 为默认边缘样式启用连接预览
      graph.connectionHandler.createEdgeState = function(me) {
        var edge = graph.createEdge(
          null,
          null,
          null,
          null,
          null,
          'strokeColor=#000000'
        )
        return new mxCellState(
          this.graph.view,
          edge,
          this.graph.getCellStyle(edge)
        )
      }

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
        var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 200, 100)
        var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 200, 100)
        // eslint-disable-next-line
        var e1 = graph.insertEdge(
          parent,
          null,
          '',
          v1,
          v2,
          'strokeColor=#000000'
        )
      } finally {
        graph.getModel().endUpdate()
      }

      this.initActions(graph)
      this.graph = graph
    }
  },
  methods: {
    initActions(graph) {
      // 快捷键
      const keyHandler = new mxKeyHandler(graph)
      keyHandler.bindControlKey(90, function() {
        debugger
      }) // Ctrl+Z
    }
  }
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