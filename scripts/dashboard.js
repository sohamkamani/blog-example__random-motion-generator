import * as d3 from 'd3'

import { genRandomLinesDegree } from './gen-lines'
import CanvasLineChart from './display-lines'
import Fly from './display-fly'

const Dashboard = function({
  chartXId,
  chartYId,
  flyId,
  regenButtonId,
  degree
}) {
  const generate = () => {
    const randomLinesX = genRandomLinesDegree({
      degree,
      nPoints: 500,
      max: 5,
      min: -5
    })
    const randomLinesY = genRandomLinesDegree({
      degree,
      nPoints: 500,
      max: 5,
      min: -5
    })

    console.log(degree)

    const dataX = randomLinesX[randomLinesX.length - 1]
    const dataY = randomLinesY[randomLinesY.length - 1]

    var flyX = d3
      .scaleLinear()
      .range([0, 200])
      .domain(d3.extent(dataX, d => d * 1.5))

    var flyY = d3
      .scaleLinear()
      .range([200, 0])
      .domain(d3.extent(dataY, d => d * 1.5))

    const flyPath = dataX.map((d, i) => ({
      x: flyX(d),
      y: flyY(dataY[i])
    }))
    const fly = new Fly(flyPath, flyId)

    const chartX = new CanvasLineChart(chartXId, dataX)
    const chartY = new CanvasLineChart(chartYId, dataY)

    fly.draw()
    chartX.draw()
    chartY.draw()

    return { fly, chartX, chartY }
  }

  let { fly, chartX, chartY } = generate()

  const animate = () =>
    requestAnimationFrame(() => {
      if (fly.next() && chartX.next() && chartY.next()) {
        fly.draw()
        chartX.draw()
        chartY.draw()
        animate(fly, chartX, chartY)
      }
    })

    const regen = document.getElementById(regenButtonId)
    regen.addEventListener('click', () => {
      const newEntities = generate()
      fly = newEntities.fly
      chartX = newEntities.chartX
      chartY = newEntities.chartY
      animate()
    })

  return {
    animate,
    generate
  }
}

export default Dashboard