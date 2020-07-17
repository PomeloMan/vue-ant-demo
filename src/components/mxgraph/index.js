import mxgraphFactory from 'mxgraph'
import { Base64 } from 'base64-js'

const mxgraph = mxgraphFactory({
  mxImageBasePath: './mxgraph/images',
  mxBasePath: '.'
})

export const {
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
} = mxgraph

// 定义色值
mxConstants.VALID_COLOR = '#000000'; // 有效的连接线
mxConstants.INVALID_COLOR = '#f5222d'; // 无效的连接线
mxConstants.VERTEX_SELECTION_COLOR = '#1890ff'; // 图形选中边框虚线颜色
mxConstants.EDGE_SELECTION_COLOR = '#1890ff'; // 连接线选中虚线颜色

const Graph = function () {
  this.arrowFill = '#40a9ff';
  this.mainHandle = (!mxClient.IS_SVG) ? new mxImage(`${process.env.VUE_APP_BASE_URL}mxgraph/images/handle-main.png`, 17, 17) :
    this.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + this.arrowFill + '" stroke-width="1"/>');
  this.secondaryHandle = (!mxClient.IS_SVG) ? new mxImage(`${process.env.VUE_APP_BASE_URL}images/handle-secondary.png`, 17, 17) :
    this.createSvgImage(16, 16, '<path d="m 8 3 L 13 8 L 8 13 L 3 8 z" stroke="#fff" fill="#fca000"/>');
  this.fixedHandle = (!mxClient.IS_SVG) ? new mxImage(`${process.env.VUE_APP_BASE_URL}images/handle-fixed.png`, 17, 17) :
    this.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + this.arrowFill + '" stroke-width="1"/><path d="m 7 7 L 11 11 M 7 11 L 11 7" stroke="#fff"/>');
  this.terminalHandle = (!mxClient.IS_SVG) ? new mxImage(`${process.env.VUE_APP_BASE_URL}images/handle-terminal.png`, 17, 17) :
    this.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + this.arrowFill + '" stroke-width="1"/><circle cx="9" cy="9" r="2" stroke="#fff" fill="transparent"/>');
  this.rotationHandle = (!mxClient.IS_SVG) ? new mxImage(`${process.env.VUE_APP_BASE_URL}images/handle-rotate.png`, 16, 16) :
    this.createSvgImage(16, 16, '<path stroke="' + this.arrowFill +
      '" fill="' + this.arrowFill +
      '" d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"/>',
      24, 24);
}
Graph.prototype.createSvgImage = function (w, h, data, coordWidth, coordHeight) {
  var tmp = unescape(encodeURIComponent(
    `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg xmlns="${mxConstants.NS_SVG}" xmlns:xlink="${mxConstants.NS_XLINK}" width="${w}px" height="${h}px" ${((coordWidth != null && coordHeight != null) ? 'viewBox="0 0 ' + coordWidth + ' ' + coordHeight + '" ' : '')} version="1.1">${data}</svg>
    `));
  return new mxImage('data:image/svg+xml;base64,' + ((window.btoa) ? btoa(tmp) : Base64.encode(tmp, true)), w, h)
}
export const graph = new Graph()

export default mxgraph