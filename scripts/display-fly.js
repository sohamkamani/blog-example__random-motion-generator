const TAU = Math.PI*2

const Fly = function(journeyPoints, canvasId){
  this.journeyPoints = journeyPoints
  var canvas = document.getElementById(canvasId)
  const context = canvas.getContext('2d')
  this.context = context
  this.position = 0
}

Fly.prototype.draw = function(){
  const {context, journeyPoints, position} = this
  context.beginPath()
  context.fillStyle = 'white'
  context.fillRect(0,0,200,200)
  const {x, y} = journeyPoints[position]
  context.arc(x, y, 10, 0, TAU)
  context.stroke()
}

Fly.prototype.next = function(){
  this.position += 1
  if(this.position >= this.journeyPoints.length -1){
    return false
  }
  return true
}

Fly.prototype.animate = function(){
  requestAnimationFrame(()=>{
    
    this.next()
    this.draw()
    this.animate()
  })
}

export default Fly
