const genRandomLinesDegree = ({ degree, nPoints, max, min }) => {
  const lines = [genRandomLine(nPoints, max, min)]

  for (let i = 0; i < degree - 1; i++) {

    lines.push(integralOf(lines[lines.length - 1], genRandomPoint(max, min)))
  }

  return lines
}

const genRandomLine = (nPoints, max, min) => {
  const points = []
  for (let i = 0; i < nPoints; i += 1) {
    points.push(genRandomPoint(max, min))
  }
  return points
}

const genRandomPoint = (max, min) => Math.random() * (max - min) + min

const integralOf = (line, init) => {
  let sum = init
  const integral = []
  for (let i = 0; i < line.length; i++) {
    sum += line[i]
    integral.push(sum)
  }
  return integral
}
