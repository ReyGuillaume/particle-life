const canvas = document.querySelector("#ctx")
const ctx = canvas.getContext('2d')

let currentStart = 0
const particleSize = 5
const canvasSize = window.innerHeight - 50

canvas.width = canvasSize
canvas.height = canvasSize

const draw = (x, y, color, size) => {
  ctx.fillStyle = color
  ctx.fillRect(x, y, size, size) 
}

let particles = []

const createParticle = (x, y, color) => {
  return {x, y, vx: 0, vy: 0, color}
}

const random = () => Math.random() * canvasSize - particleSize

const clamp = (val, min, max) => {
  if (val < min) return min
  if (val > max) return max
  return val
}

const create = (number, color) => {
  const group = []
  for (let i = 0; i < number; i++) {
    group.push(createParticle(random(), random(), color))
    particles.push(group[i])
  }
  return group
}

const rule = (particles1, particles2, g, radius) => {
  for (let i = 0; i < particles1.length; i++) {
    let fx = 0
    let fy = 0

    let a = particles1[i]

    for (let j = 0; j < particles2.length; j++) {
      let b = particles2[j]

      let dx = a.x - b.x
      let dy = a.y - b.y

      let d = Math.sqrt(dx * dx + dy * dy)

      if (d > 0 && d < radius) {
        let F = g * 1 / d
        fx += F * dx
        fy += F * dy
      }
    }

    a.vx = (a.vx + fx) * 0.2
    a.vy = (a.vy + fy) * 0.2
    a.x = clamp(a.x + a.vx, 0, canvasSize - particleSize)
    a.y = clamp(a.y + a.vy, 0, canvasSize - particleSize)

    if(a.x <= 0 || a.x >= canvasSize - particleSize) a.vx *= -1
    if(a.y <= 0 || a.y >= canvasSize - particleSize) a.vy *= -1
  }
}

const update = (nb) => {
  rule(blue, blue, bxb.value, inputRadBlue.value)
  rule(blue, red, bxr.value, inputRadBlue.value)
  rule(blue, green, bxg.value, inputRadBlue.value)
  rule(blue, yellow, bxy.value, inputRadBlue.value)

  rule(red, blue, rxb.value, inputRadRed.value)
  rule(red, red, rxr.value, inputRadRed.value)
  rule(red, green, rxg.value, inputRadRed.value)
  rule(red, yellow, rxy.value, inputRadRed.value)

  rule(green, blue, gxb.value, inputRadGreen.value)
  rule(green, red, gxr.value, inputRadGreen.value)
  rule(green, green, gxg.value, inputRadGreen.value)
  rule(green, yellow, gxy.value, inputRadGreen.value)

  rule(yellow, blue, yxb.value, inputRadYellow.value)
  rule(yellow, red, yxr.value, inputRadYellow.value)
  rule(yellow, green, yxg.value, inputRadYellow.value)
  rule(yellow, yellow, yxy.value, inputRadYellow.value)

  ctx.clearRect(0, 0, canvasSize, canvasSize)
  // draw(0, 0, "#555", canvasSize)

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    draw(p.x, p.y, p.color, particleSize / 2)
  }

  if (currentStart == nb) requestAnimationFrame(() => update(nb))
}

const inputNbBlue = document.querySelector("#blueNb")
const inputNbRed = document.querySelector("#redNb")
const inputNbGreen = document.querySelector("#greenNb")
const inputNbYellow = document.querySelector("#yellowNb")

const inputRadBlue = document.querySelector("#blueRad")
const inputRadRed = document.querySelector("#redRad")
const inputRadGreen = document.querySelector("#greenRad")
const inputRadYellow = document.querySelector("#yellowRad")

const bxb = document.querySelector("#bxb")
const bxr = document.querySelector("#bxr")
const bxg = document.querySelector("#bxg")
const bxy = document.querySelector("#bxy")

const rxb = document.querySelector("#rxb")
const rxr = document.querySelector("#rxr")
const rxg = document.querySelector("#rxg")
const rxy = document.querySelector("#rxy")

const gxb = document.querySelector("#gxb")
const gxr = document.querySelector("#gxr")
const gxg = document.querySelector("#gxg")
const gxy = document.querySelector("#gxy")

const yxb = document.querySelector("#yxb")
const yxr = document.querySelector("#yxr")
const yxg = document.querySelector("#yxg")
const yxy = document.querySelector("#yxy")

let yellow = create(inputNbYellow.value, 'yellow')
let red = create(inputNbRed.value, 'red')
let green = create(inputNbGreen.value, 'green')
let blue = create(inputNbBlue.value, 'blue')

const start = () => {
  currentStart++
  particles = []
  
  yellow = create(inputNbYellow.value, 'yellow')
  red = create(inputNbRed.value, 'red')
  green = create(inputNbGreen.value, 'green')
  blue = create(inputNbBlue.value, 'blue')

  update(currentStart)
}

const randomize = () => {
  inputRadBlue.value = Math.random() * 450 + 50
  inputRadRed.value = Math.random() * 450 + 50
  inputRadGreen.value = Math.random() * 450 + 50
  inputRadYellow.value = Math.random() * 450 + 50
  
  bxb.value = Math.random() * 2 - 1
  bxr.value = Math.random() * 2 - 1
  bxg.value = Math.random() * 2 - 1
  bxy.value = Math.random() * 2 - 1

  rxb.value = Math.random() * 2 - 1
  rxr.value = Math.random() * 2 - 1
  rxg.value = Math.random() * 2 - 1
  rxy.value = Math.random() * 2 - 1

  gxb.value = Math.random() * 2 - 1
  gxr.value = Math.random() * 2 - 1
  gxg.value = Math.random() * 2 - 1
  gxy.value = Math.random() * 2 - 1

  yxb.value = Math.random() * 2 - 1
  yxr.value = Math.random() * 2 - 1
  yxg.value = Math.random() * 2 - 1
  yxy.value = Math.random() * 2 - 1
}

document.querySelector("#start").addEventListener("click", _ => start())
document.querySelector("#randomize").addEventListener("click", _ => randomize())
