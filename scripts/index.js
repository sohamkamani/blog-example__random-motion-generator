import Dashboard from './dashboard'
import CanvasLineChart from './display-lines'
import { genRandomLinesDegree } from './gen-lines'

const d0 = new Dashboard({
  chartXId: 'd0x',
  chartYId: 'd0y',
  flyId: 'd0f',
  degree: 1,
  regenButtonId: 'd0regen'
})

d0.animate()

const d1 = new Dashboard({
  chartXId: 'd1x',
  chartYId: 'd1y',
  flyId: 'd1f',
  degree: 2,
  regenButtonId: 'd1regen'
})

d1.animate()

const d2 = new Dashboard({
  chartXId: 'd2x',
  chartYId: 'd2y',
  flyId: 'd2f',
  degree: 3,
  regenButtonId: 'd2regen'
})

d2.animate()

var copyCanvas = function(src, dst){
  var sourceCanvas = document.getElementById(src)
  var destinationCanvas = document.getElementById(dst)
  var destCtx = destinationCanvas.getContext('2d')
  destCtx.drawImage(sourceCanvas, 0, 0)
}

const drawSampleCharts = () => {
  const randomLines = genRandomLinesDegree({
    degree: 3,
    nPoints: 200,
    max: 5,
    min: -5
  })

  const chart1 = new CanvasLineChart('sample0', randomLines[0])
  const chart2 = new CanvasLineChart('sample1', randomLines[1])
  const chart3 = new CanvasLineChart('sample2', randomLines[2])
  chart1.clear()
  chart2.clear()
  chart3.clear()
  chart1.drawChart()
  chart2.drawChart()
  chart3.drawChart()
  copyCanvas('sample0', 'sample0c')
  copyCanvas('sample1', 'sample1c')
  copyCanvas('sample2', 'sample2c')
}

drawSampleCharts()
document.getElementById('c-regen-sample').addEventListener('click', () => {
  drawSampleCharts()
})
