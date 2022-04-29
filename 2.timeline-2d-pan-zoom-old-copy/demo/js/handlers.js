$(document).ready(function () {
  var svg = SVG($('.graph').get(0)).size('100%', '100%')
  var links = svg.group()
  var markers = svg.group()
  var nodes = svg.group()

  var pi = Math.PI

  // cell ~100 um      = 100 000    nm = 100       um
  // carbon atom ~170 pm       0.17 nm =   0.00017 um
  var g1 = nodes.group().translate(30, 20).draggy()

  // TODO Make grid here.

  function grid (g, scale = 10, width = 1) {
    const grid = { x: 32, y: 32 }
    for (let y = 0; y <= grid.y * scale; y += scale) {
      g.line(0, y, grid.x * scale, y, 10).attr({
        stroke: '#000',
        'stroke-width': 10
      })
    }
    for (let x = 0; x <= grid.x * scale; x += scale) {
      g.line(x, 0, x, grid.y * scale).stroke({ width }).fill('#000')
    }
  }

  grid(g1)
  grid(g1, 10 * 32, 10)
  grid(g1, 10 * 32 * 32, 100)

  // g1.circle(100).fill('#fe7') // Animal cell

  // // g1.circle(10).dx(10 + pi).dy(10 + pi).fill('#7f7')
  // g1.circle(1).dx(11 + pi * 1.1).dy(11 + pi * 1.1).fill('#7f7') // Bacteria / fungal spores - 1 μm = 1000 nm
  // // g1.circle(0.5).dx(11 + pi * 1.1).dy(11 + pi * 1.1).fill('#7f7') // Giant Viruses
  // g1.circle(0.2).dx(11.1 + pi * 1.11).dy(11.1 + pi * 1.11).fill('#5f5') // Smallest bacteria
  // g1.circle(0.01).dx(11.11 + pi * 1.111).dy(11.11 + pi * 1.111).fill('#f77') // Viruses: 0.005 – 0.01 μm
  // g1.circle(0.005).dx(11.111 + pi * 1.1111).dy(11.111 + pi * 1.1111).fill('#f55') // Smallest virus
  // g1.circle(0.00017).dx(11.1111 + pi * 1.11111).dy(11.1111 + pi * 1.11111).fill('#555')

  // var g2 = nodes.group().translate(120, 70);
  // g2.circle(10).fill("#7f7"); // nm

  // var g3 = nodes.group().translate(127.5, 77.5);
  // g3.circle(1).fill("#77f");

  nodes.panZoom()
})
