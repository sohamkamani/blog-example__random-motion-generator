import * as d3 from 'd3'

import { genRandomLinesDegree } from './gen-lines'
import CanvasLineChart from './display-lines'
import Fly from './display-fly'

const randomLinesX = genRandomLinesDegree({
  degree: 4,
  nPoints: 2000,
  max: 5,
  min: -5
})
const randomLinesY = genRandomLinesDegree({
  degree: 4,
  nPoints: 2000,
  max: 5,
  min: -5
})

const cl0x = new CanvasLineChart('d0x', randomLinesX[0])
const cl0y = new CanvasLineChart('d0y', randomLinesY[0])
// const cl1 = new CanvasLineChart('d1', randomLinesX[1])
// const cl2 = new CanvasLineChart('d2', randomLinesX[2])
// const cl3 = new CanvasLineChart('d3', randomLinesX[3])

// cl0x.drawChart()
// cl1.drawChart()
// cl2.drawChart()
// cl3.drawChart()

const startFly = (dataX, dataY) => {
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
  const fly = new Fly(flyPath, 'd0f')
  return fly
}

const fly = startFly(randomLinesX[0], randomLinesY[0])

const animate = (fly, chartX, chartY) =>
  requestAnimationFrame(() => {
    if (fly.next() && chartX.next() && chartY.next()) {
      fly.draw()
      chartX.draw()
      chartY.draw()
      animate(fly, chartX, chartY)
    }
  })

animate(fly, cl0x, cl0y)
