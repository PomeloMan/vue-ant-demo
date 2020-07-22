<template>
  <div>
    <div class="mxgraph-sidebar-container" ref="sidebarContainer"></div>
    <div class="mxgraph-container" ref="graphContainer"></div>
    <div class="mxgraph-outline-container" ref="outlineContainer"></div>
  </div>
</template>

<script>
/* eslint-disable */
import {
  mxClient,
  mxLog,
  mxObjectIdentity,
  mxDictionary,
  mxResources,
  mxPoint,
  mxRectangle,
  mxEffects,
  mxUtils,
  mxConstants,
  mxEventObject,
  mxMouseEvent,
  mxEventSource,
  mxEvent,
  mxXmlRequest,
  mxClipboard,
  mxWindow,
  mxForm,
  mxImage,
  mxDivResizer,
  mxDragSource,
  mxToolbar,
  mxUndoableEdit,
  mxUndoManager,
  mxUrlConverter,
  mxPanningManager,
  mxPopupMenu,
  mxAutoSaveManager,
  mxAnimation,
  mxMorphing,
  mxImageBundle,
  mxImageExport,
  mxAbstractCanvas2D,
  mxXmlCanvas2D,
  mxSvgCanvas2D,
  mxVmlCanvas2D,
  mxGuide,
  mxShape,
  mxStencil,
  mxStencilRegistry,
  mxMarker,
  mxActor,
  mxCloud,
  mxRectangleShape,
  mxEllipse,
  mxDoubleEllipse,
  mxRhombus,
  mxPolyline,
  mxArrow,
  mxArrowConnector,
  mxText,
  mxTriangle,
  mxHexagon,
  mxLine,
  mxImageShape,
  mxLabel,
  mxCylinder,
  mxConnector,
  mxSwimlane,
  mxGraphLayout,
  mxStackLayout,
  mxPartitionLayout,
  mxCompactTreeLayout,
  mxRadialTreeLayout,
  mxFastOrganicLayout,
  mxCircleLayout,
  mxParallelEdgeLayout,
  mxCompositeLayout,
  mxEdgeLabelLayout,
  mxGraphAbstractHierarchyCell,
  mxGraphHierarchyNode,
  mxGraphHierarchyEdge,
  mxGraphHierarchyModel,
  mxSwimlaneModel,
  mxHierarchicalLayoutStage,
  mxMedianHybridCrossingReduction,
  mxMinimumCycleRemover,
  mxCoordinateAssignment,
  mxSwimlaneOrdering,
  mxHierarchicalLayout,
  mxSwimlaneLayout,
  mxGraphModel,
  mxCell,
  mxGeometry,
  mxCellPath,
  mxPerimeter,
  mxPrintPreview,
  mxStylesheet,
  mxCellState,
  mxGraphSelectionModel,
  mxCellEditor,
  mxCellRenderer,
  mxEdgeStyle,
  mxStyleRegistry,
  mxGraphView,
  mxGraph,
  mxCellOverlay,
  mxOutline,
  mxMultiplicity,
  mxLayoutManager,
  mxSwimlaneManager,
  mxTemporaryCellStates,
  mxCellStatePreview,
  mxConnectionConstraint,
  mxGraphHandler,
  mxPanningHandler,
  mxPopupMenuHandler,
  mxCellMarker,
  mxSelectionCellsHandler,
  mxConnectionHandler,
  mxConstraintHandler,
  mxRubberband,
  mxHandle,
  mxVertexHandler,
  mxEdgeHandler,
  mxElbowEdgeHandler,
  mxEdgeSegmentHandler,
  mxKeyHandler,
  mxTooltipHandler,
  mxCellTracker,
  mxCellHighlight,
  mxDefaultKeyHandler,
  mxDefaultPopupMenu,
  mxDefaultToolbar,
  mxEditor,
  mxCodecRegistry,
  mxCodec,
  mxObjectCodec,
  mxCellCodec,
  mxModelCodec,
  mxRootChangeCodec,
  mxChildChangeCodec,
  mxTerminalChangeCodec,
  mxGenericChangeCodec,
  mxGraphCodec,
  mxGraphViewCodec,
  mxStylesheetCodec,
  mxDefaultKeyHandlerCodec,
  mxDefaultToolbarCodec,
  mxDefaultPopupMenuCodec,
  mxEditorCodec
} from '../mxgraph/index'
export default {
  data() {
    return {
      assetBasePath: process.env.VUE_APP_BASE_URL,
      graph: null,
      keyHandler: null,
      layout: null,
      outline: null,
      sidebar: null,
      undoManager: null
    }
  },
  created() { },
  mounted() {
    const $this = this
    // Checks if browser is supported
    if (!mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mxUtils.error(this.$t('message.browser_not_supported'), 200, false)
    } else {
      // 取消默认右击菜单
      mxEvent.disableContextMenu(this.$refs.graphContainer)
      const graph = new mxGraph(this.$refs.graphContainer)
      graph.setCellsMovable(true) // 模型可移动
      // graph.setAutoSizeCells(true) // 自动更新模型大小，如修改模型文本内容后会自适应本文大小
      graph.setConnectable(true) // 图形可连接
      graph.setPanning(true) // 画布可移动
      graph.setDropEnabled(true) // 组件可嵌套

      // 开启区域选择，鼠标框选
      new mxRubberband(graph)

      // 图形默认样式
      const vertexStyle = graph.getStylesheet().getDefaultVertexStyle()
      // vertexStyle[mxConstants.STYLE_ROUNDED] = true
      vertexStyle[mxConstants.STYLE_FILLCOLOR] = '#ffffff' // 填充颜色色
      vertexStyle[mxConstants.STYLE_STROKECOLOR] = '#000000' // 边框颜色
      vertexStyle[mxConstants.STYLE_STROKEWIDTH] = '1' // 边框宽
      vertexStyle[mxConstants.STYLE_FONTCOLOR] = '#000000' // 文字颜色
      vertexStyle[mxConstants.STYLE_FONTSIZE] = '12'
      graph.getStylesheet().putDefaultVertexStyle(vertexStyle)
      // 连接线默认样式
      const edgeStyle = graph.getStylesheet().getDefaultEdgeStyle()
      edgeStyle[mxConstants.STYLE_EDGE] = mxConstants.EDGESTYLE_ORTHOGONAL // 连接线样式
      edgeStyle[mxConstants.STYLE_FONTCOLOR] = '#000000'
      edgeStyle[mxConstants.STYLE_STROKECOLOR] = '#000000'
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

      // 总览窗口
      this.outline = new mxOutline(graph, this.$refs.outlineContainer)
      // Enables automatic layout on the graph and installs
      // a tree layout for all groups who's children are
      // being changed, added or removed.
      this.layout = new mxCompactTreeLayout(graph, false)
      this.layout.levelDistance = 60
      this.layout.nodeDistance = 16

      // 添加图形
      const parent = graph.getDefaultParent()
      graph.getModel().beginUpdate()
      try {
        var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 120, 60)
        var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 120, 60)
        var v3 = graph.insertVertex(parent, null, 'Triangle', 200, 300, 80, 80, 'shape=triangle;perimeter=trianglePerimeter')
        var v4 = graph.insertVertex(parent, null, 'Ellipse', 400, 300, 120, 80, 'shape=ellipse;perimeter=ellipsePerimeter')
        // eslint-disable-next-line
        graph.insertEdge(
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

      // undo/redo
      const undoManager = new mxUndoManager()
      const listener = function(sender, evt) {
        undoManager.undoableEditHappened(evt.getProperty('edit'))
      }
      graph.getModel().addListener(mxEvent.UNDO, listener)
      graph.getView().addListener(mxEvent.UNDO, listener)
      this.undoManager = undoManager

      // 侧边栏
      const sidebar = new mxToolbar(this.$refs.sidebarContainer)
      sidebar.enabled = false
      var addVertex = function(icon, w, h, style) {
        var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style)
        vertex.setVertex(true)
        $this.addSidebarIcon(graph, sidebar, vertex, icon)
      }
      const url = this.assetBasePath
      addVertex(
        `${url}mxgraph/images/swimlane.gif`,
        120,
        160,
        'shape=swimlane;startSize=20;'
      )
      addVertex(`${url}mxgraph/images/rectangle.gif`, 120, 60, '')
      addVertex(`${url}mxgraph/images/rounded.gif`, 120, 60, 'rounded=1')
      addVertex(`${url}mxgraph/images/ellipse.gif`, 120, 80, 'shape=ellipse;perimeter=ellipsePerimeter;')
      addVertex(`${url}mxgraph/images/rhombus.gif`, 80, 80, 'shape=rhombus;perimeter=rhombusPerimeter;')
      addVertex(`${url}mxgraph/images/triangle.gif`, 80, 80, 'shape=triangle;perimeter=trianglePerimeter;')
      this.sidebar = sidebar

      this.initActions(graph)
      this.graph = graph
    }
  },
  methods: {
    initActions(graph) {
      const $this = this
      // 快捷键
      const keyHandler = new mxKeyHandler(graph)
      keyHandler.bindControlKey(90, function() {
        $this.undoManager.undo()
      }) // Ctrl+Z
      keyHandler.bindControlKey(89, function() {
        $this.undoManager.redo()
      }) // Ctrl+Y
    },
    addSidebarIcon(graph, sidebar, prototype, image) {
      var funct = function(graph, evt, cell) {
        // graph.stopEditing(false)
        var pt = graph.getPointForEvent(evt)
        var vertex = graph.getModel().cloneCell(prototype)
        vertex.geometry.x = pt.x
        vertex.geometry.y = pt.y
        graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell))
      }
      var img = sidebar.addMode(null, image, funct)
      mxUtils.makeDraggable(img, graph, funct)
    }
  }
}
</script>

<style lang="scss" scoped>
:root {
  position: relative;
}
.mxgraph-sidebar-container {
  position: absolute;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  width: 24px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(251, 117, 91, 0.2);
}
.mxgraph-container {
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 24px;
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