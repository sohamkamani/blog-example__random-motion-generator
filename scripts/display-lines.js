import * as d3 from 'd3'

function displayCanvas (canvasId, data) {
  var canvas = document.getElementById(canvasId)
  const context = canvas.getContext('2d')

  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  }
  const width = canvas.width - margin.left - margin.right
  const height = canvas.height - margin.top - margin.bottom

  var x = d3
    .scaleLinear()
    .range([0, width])
    .domain([0, data.length])

  var y = d3
    .scaleLinear()
    .range([height, 0])
    .domain(d3.extent(data, d => d * 1.3))

  var chartLine = d3
    .line()
    .x((_, i) => {
      return x(i)
    })
    .y(d => y(d))
    .curve(d3.curveCatmullRom)
    .context(context)

  context.translate(margin.left, margin.top)

  context.beginPath()
  chartLine(data)
  context.lineWidth = 1.5
  context.strokeStyle = 'steelblue'
  context.stroke()
}

export default displayCanvas
