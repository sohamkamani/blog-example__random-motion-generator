import * as d3 from 'd3'

function CanvasLineChart(canvasId, data) {
  var canvas = document.getElementById(canvasId)
  const context = canvas.getContext('2d')
  context.restore()
  context.beginPath()

  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  }
  const width = canvas.width - margin.left - margin.right
  const height = canvas.height - margin.top - margin.bottom

  var scaleX = d3
    .scaleLinear()
    .range([0, width])
    .domain([0, data.length])

  var scaleY = d3
    .scaleLinear()
    .range([height, 0])
    .domain(d3.extent(data, d => d * 1.3))

  var chartLine = d3
    .line()
    .x((_, i) => {
      return scaleX(i)
    })
    .y(d => scaleY(d))
    .curve(d3.curveCatmullRom)
    .context(context)

  context.save()
  context.translate(margin.left, margin.top)

  this.context = context
  this.data = data
  this.scaleX = scaleX
  this.chartLine = chartLine
  this.position = 0
  this.height = height
  this.width = width
}

CanvasLineChart.prototype.drawChart = function() {
  const { context, data } = this
  context.beginPath()
  this.chartLine(data)
  context.lineWidth = 1.5
  context.strokeStyle = 'steelblue'
  context.stroke()
}

CanvasLineChart.prototype.next = function() {
  this.position += 1
  if (this.position > this.data.length - 1) {
    return false
  }
  return true
}

CanvasLineChart.prototype.drawRadar = function() {
  const { context } = this
  context.beginPath()
  context.lineWidth = 1
  context.strokeStyle = 'tomato'
  const xPos = this.scaleX(this.position)
  context.moveTo(xPos, 0)
  context.lineTo(xPos, this.height)
  context.stroke()
}

CanvasLineChart.prototype.clear = function() {
  const { context, height, width } = this
  context.beginPath()
  context.fillStyle = 'white'
  context.fillRect(-10, -10, width + 20, height + 20)
}

CanvasLineChart.prototype.draw = function() {
  this.clear()
  this.drawChart()
  this.drawRadar()
}

export default CanvasLineChart
