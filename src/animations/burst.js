import mojs from '@mojs/core'
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'

const _burstOutGranule = new mojs.Burst({
  left: 0, top: 0,
  radius: { 4: 32 },
  angle: 45,
  count: 14,
  children: {
    radius: 2.5,
    fill: [
      { '#9EC9F5': '#9ED8C6' },
      { '#91D3F7': '#9AE4CF' },

      { '#DC93CF': '#E3D36B' },
      { '#CF8EEF': '#CBEB98' },

      { '#87E9C6': '#1FCC93' },
      { '#A7ECD0': '#9AE4CF' },

      { '#87E9C6': '#A635D9' },
      { '#D58EB3': '#E0B6F5' },

      { '#F48BA2': '#CF8EEF' },
      { '#91D3F7': '#A635D9' },

      { '#CF8EEF': '#CBEB98' },
      { '#87E9C6': '#A635D9' },
    ],
    scale: { 1: 0, easing: 'quad.in' },
    pathScale: [.8, null],
    degreeShift: [13, null],
    duration: [500, 700],
    easing: 'quint.out',
    // speed: .1
  }
});

export function burstOutGranule(e) {
  const coords = { x: e.pageX, y: e.pageY };
  const svg = Snap(e.target)
  Snap.animate(0, 1, function (val) {
    svg.attr({
      opacity: val
    });
  }, 300);
  _burstOutGranule
    .tune(coords)
    .replay();
}