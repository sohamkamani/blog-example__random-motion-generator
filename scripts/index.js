import * as d3 from 'd3'

import { genRandomLinesDegree } from './gen-lines'
import CanvasLineChart from './display-lines'
import Fly from './display-fly'
import Dashboard from './dashboard'

const randomLinesX = genRandomLinesDegree({
  degree: 4,
  nPoints: 500,
  max: 5,
  min: -5
})
const randomLinesY = genRandomLinesDegree({
  degree: 4,
  nPoints: 500,
  max: 5,
  min: -5
})

const startFly = (dataX, dataY, canvasId) => {
  var flyX = d3
    .scaleLinear()
    .range([0, 200])
    .domain(d3.extent(dataX, d => d * 1.5))

  var flyY = d3
    .scaleLinear()
    .range([0, 200])
    .domain(d3.extent(dataY, d => d * 1.5))

  const flyPath = dataX.map((d, i) => ({
    x: flyX(d),
    y: flyY(dataY[i])
  }))
  const fly = new Fly(flyPath, canvasId)
  return fly
}

// const fly0 = startFly(randomLinesX[0], randomLinesY[0], 'd0f')
// const cl0x = new CanvasLineChart('d0x', randomLinesX[0])
// const cl0y = new CanvasLineChart('d0y', randomLinesY[0])

const d0 = new Dashboard({
  chartXId: 'd0x',
  chartYId: 'd0y',
  flyId: 'd0f',
  degree: 0
})

const fly1 = startFly(randomLinesX[1], randomLinesY[1], 'd1f')
const cl1x = new CanvasLineChart('d1x', randomLinesX[1])
const cl1y = new CanvasLineChart('d1y', randomLinesY[1])

const fly2 = startFly(randomLinesX[2], randomLinesY[2], 'd2f')
const cl2x = new CanvasLineChart('d2x', randomLinesX[2])
const cl2y = new CanvasLineChart('d2y', randomLinesY[2])

const fly3 = startFly(randomLinesX[3], randomLinesY[3], 'd3f')
const cl3x = new CanvasLineChart('d3x', randomLinesX[3])
const cl3y = new CanvasLineChart('d3y', randomLinesY[3])

const animate = (fly, chartX, chartY) =>
  requestAnimationFrame(() => {
    if (fly.next() && chartX.next() && chartY.next()) {
      fly.draw()
      chartX.draw()
      chartY.draw()
      animate(fly, chartX, chartY)
    }
  })

// animate(fly0, cl0x, cl0y)
d0.animate()
animate(fly1, cl1x, cl1y)
animate(fly2, cl2x, cl2y)
animate(fly3, cl3x, cl3y)

const regen = document.getElementById('d0regen')
regen.addEventListener('click', () => {
  d0.generate()
})
