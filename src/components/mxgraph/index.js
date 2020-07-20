/* eslint-disable */
import mxgraphFactory from 'mxgraph'
import { Base64 } from 'base64-js'

const mxgraph = mxgraphFactory({
  mxImageBasePath: `${process.env.VUE_APP_BASE_URL}mxgraph/images`,
  mxBasePath: `${process.env.VUE_APP_BASE_URL}mxgraph`
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

mxConstants.DEFAULT_VALID_COLOR = '#1890ff';
mxConstants.DEFAULT_INVALID_COLOR = '#f5222d';
mxConstants.VALID_COLOR = '#000000'; // 有效的连接线
mxConstants.INVALID_COLOR = '#f5222d'; // 无效的连接线
mxConstants.VERTEX_SELECTION_COLOR = '#1890ff'; // 图形选中边框虚线颜色
mxConstants.EDGE_SELECTION_COLOR = '#1890ff'; // 连接线选中虚线颜色

/******************** v连接线v ********************/
export function createSvgImage(w, h, data, coordWidth, coordHeight) {
  var tmp = unescape(encodeURIComponent(
    `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg xmlns="${mxConstants.NS_SVG}" xmlns:xlink="${mxConstants.NS_XLINK}" width="${w}px" height="${h}px" ${((coordWidth != null && coordHeight != null) ? 'viewBox="0 0 ' + coordWidth + ' ' + coordHeight + '" ' : '')} version="1.1">${data}</svg>
    `));
  return new mxImage('data:image/svg+xml;base64,' + ((window.btoa) ? btoa(tmp) : Base64.encode(tmp, true)), w, h)
}
// 定义每个形状的连接点(覆盖原方法)
mxGraph.prototype.getAllConnectionConstraints = function (terminal) {
  if (terminal != null && terminal.shape != null) {
    if (terminal.shape.stencil != null) {
      if (terminal.shape.stencil.constraints != null) {
        return terminal.shape.stencil.constraints;
      }
    }
    else if (terminal.shape.constraints != null) {
      return terminal.shape.constraints;
    }
  }
  return null;
};
// 定义所有形状的默认约束
mxShape.prototype.constraints = [
  new mxConnectionConstraint(new mxPoint(0, 0), true),
  new mxConnectionConstraint(new mxPoint(0.25, 0), true),
  new mxConnectionConstraint(new mxPoint(0.5, 0), true),
  new mxConnectionConstraint(new mxPoint(0.75, 0), true),
  new mxConnectionConstraint(new mxPoint(1, 0), true),
  new mxConnectionConstraint(new mxPoint(0, 0.25), true),
  new mxConnectionConstraint(new mxPoint(0, 0.5), true),
  new mxConnectionConstraint(new mxPoint(0, 0.75), true),
  new mxConnectionConstraint(new mxPoint(1, 0.25), true),
  new mxConnectionConstraint(new mxPoint(1, 0.5), true),
  new mxConnectionConstraint(new mxPoint(1, 0.75), true),
  new mxConnectionConstraint(new mxPoint(0, 1), true),
  new mxConnectionConstraint(new mxPoint(0.25, 1), true),
  new mxConnectionConstraint(new mxPoint(0.5, 1), true),
  new mxConnectionConstraint(new mxPoint(0.75, 1), true),
  new mxConnectionConstraint(new mxPoint(1, 1), true)
];
mxPolyline.prototype.constraints = null;
// 图形连接点高亮色，当鼠标移动到该连接点显示的颜色(覆盖原值，默认mxConstants.DEFAULT_VALID_COLOR(#00ff00))
mxConstraintHandler.prototype.highlightColor = mxConstants.DEFAULT_VALID_COLOR;
// 图形连接点形状，当鼠标移动到该连接点显示的形状(覆盖原方法，默认正方形)
mxConstraintHandler.prototype.createHighlightShape = function () {
  var hl = new mxEllipse(null, this.highlightColor, this.highlightColor, 0);
  hl.opacity = mxConstants.HIGHLIGHT_OPACITY;
  return hl;
};
// 连接线更新时样式(覆盖原方法，默认线条加粗)
mxConnectionHandler.prototype.updatePreview = function () { };
// 使用固定的连接点将边线连接到顶点(覆盖原方法)
mxConstraintHandler.prototype.intersects = function (icon, point, source, existingEdge) {
  return (!source || existingEdge) || mxUtils.intersects(icon.bounds, point);
};
// 更新连接线状态，编辑连接线时触发更新(覆盖原方法)
mxConnectionHandler.prototype.updateEdgeState = function (current, constraint) {
  if (this.sourceConstraint != null && this.sourceConstraint.point != null) {
    this.edgeState.style[mxConstants.STYLE_EXIT_X] = this.sourceConstraint.point.x;
    this.edgeState.style[mxConstants.STYLE_EXIT_Y] = this.sourceConstraint.point.y;
  }
  if (constraint != null && constraint.point != null) {
    this.edgeState.style[mxConstants.STYLE_ENTRY_X] = constraint.point.x;
    this.edgeState.style[mxConstants.STYLE_ENTRY_Y] = constraint.point.y;
  }
  else {
    delete this.edgeState.style[mxConstants.STYLE_ENTRY_X];
    delete this.edgeState.style[mxConstants.STYLE_ENTRY_Y];
  }
  this.edgeState.absolutePoints = [null, (this.currentState != null) ? null : current];
  this.graph.view.updateFixedTerminalPoint(this.edgeState, this.previous, true, this.sourceConstraint);
  if (this.currentState != null) {
    if (constraint == null) {
      constraint = this.graph.getConnectionConstraint(this.edgeState, this.previous, false);
    }
    this.edgeState.setAbsoluteTerminalPoint(null, false);
    this.graph.view.updateFixedTerminalPoint(this.edgeState, this.currentState, false, constraint);
  }
  var realPoints = null;
  if (this.waypoints != null) {
    realPoints = [];
    for (var i = 0; i < this.waypoints.length; i++) {
      var pt = this.waypoints[i].clone();
      this.convertWaypoint(pt);
      realPoints[i] = pt;
    }
  }
  this.graph.view.updatePoints(this.edgeState, realPoints, this.previous, this.currentState);
  this.graph.view.updateFloatingTerminalPoints(this.edgeState, this.previous, this.currentState);
};
// 连接线图片
const arrowFillColor = '#40a9ff';
const mainHandleImage = (!mxClient.IS_SVG) ? new mxImage(`${process.env.VUE_APP_BASE_URL}mxgraph/images/handle-main.png`, 17, 17) :
  createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + arrowFillColor + '" stroke-width="1"/>');
const secondaryHandleImage = (!mxClient.IS_SVG) ? new mxImage(`${process.env.VUE_APP_BASE_URL}images/handle-secondary.png`, 17, 17) :
  createSvgImage(16, 16, '<path d="m 8 3 L 13 8 L 8 13 L 3 8 z" stroke="#fff" fill="#fca000"/>');
const fixedHandleImage = (!mxClient.IS_SVG) ? new mxImage(`${process.env.VUE_APP_BASE_URL}images/handle-fixed.png`, 17, 17) :
  createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + arrowFillColor + '" stroke-width="1"/><path d="m 7 7 L 11 11 M 7 11 L 11 7" stroke="#fff"/>');
const terminalHandleImage = (!mxClient.IS_SVG) ? new mxImage(`${process.env.VUE_APP_BASE_URL}images/handle-terminal.png`, 17, 17) :
  createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + arrowFillColor + '" stroke-width="1"/><circle cx="9" cy="9" r="2" stroke="#fff" fill="transparent"/>');
const rotationHandleImage = (!mxClient.IS_SVG) ? new mxImage(`${process.env.VUE_APP_BASE_URL}images/handle-rotate.png`, 16, 16) :
  createSvgImage(16, 16, '<path stroke="' + arrowFillColor +
    '" fill="' + arrowFillColor +
    '" d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"/>',
    24, 24);
mxVertexHandler.prototype.handleImage = mainHandleImage
mxVertexHandler.prototype.secondaryHandleImage = secondaryHandleImage
mxEdgeHandler.prototype.handleImage = mainHandleImage
mxEdgeHandler.prototype.terminalHandleImage = terminalHandleImage
mxEdgeHandler.prototype.fixedHandleImage = fixedHandleImage
mxEdgeHandler.prototype.labelHandleImage = secondaryHandleImage
mxOutline.prototype.sizerImage = mainHandleImage
/******************** ^连接线^ ********************/


export default mxgraph