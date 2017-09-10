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

displayCanvas('d0', randomLinesX[0])
displayCanvas('d1', randomLinesX[1])
displayCanvas('d2', randomLinesX[2])
displayCanvas('d3', randomLinesX[3])

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
  fly.animate()
}

startFly(randomLinesX[1], randomLinesY[1])