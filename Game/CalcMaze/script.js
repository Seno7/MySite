const w = 300
const cw = 30
const cn = 5
const sw = (w-cw*(2*cn-1)) / 2
const bw = 10

const get = id => document.getElementById(id)
const ael = (id, type, f) => get(id).addEventListener(type, f)
const flr = n => Math.floor(n)
const ran = n => flr(Math.random()*n)
const ceil = n => Math.ceil(n)
const p10 = n => Math.pow(10, n)

const play = id => {
  get(id+"_audio").currentTime = 0
  get(id+"_audio").play()
}

const cols = ["#bdf", "#fbb", "#bfd", "#eea"]

let game

function setup() {
  banDefault()
  setPads()
  createCanvas(w, w).id("board")

  game = new Game()
}

function draw() {
  game.frame()
}

function banDefault() {
  for (let eh of ["touchstart", "touchmove", "touchend", "click"]) document.addEventListener(eh, e => e.preventDefault(), { passive: false })
}

function setPads() {
  let pads = ["u", "d", "l", "r"]
  for (let e of ["touchstart", "click"]) {
    for (let i = 0; i < 4; i++) ael("pad_"+pads[i], e, () => game.setPreDir(i))

    ael("pad_retry", e, () => {
      play("tap")
      get("modal").style.display = "none"
      game = new Game()
    })
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW || key == 'w') game.setPreDir(0)
  else if (keyCode == DOWN_ARROW || key == 's') game.setPreDir(1)
  else if (keyCode == LEFT_ARROW || key == 'a') game.setPreDir(2)
  else if (keyCode == RIGHT_ARROW || key == 'd') game.setPreDir(3)
}

class Player {
  constructor() {
    this.x = sw - 2*cw
    this.y = w/2
    this.v = 20
    this.r = 5

    this.d = 0

    this.predir = [1, 0]
    this.dir = [1, 0]

    this.n = 1
    this.pos = [[this.x, this.y]]
  }

  draw() {
    colorMode(HSB);
    noStroke()
    const d = this.r / 2
    let n = this.n
    for (let i = 0; i < this.pos.length; i++) {
      let l = 0
      while (p10(l+1) <= n) l++
      n -= p10(l)
      fill((45*l+240)%360, 80, 100)

      const x = this.pos[i][0] - d
      const y = this.pos[i][1] - d
      rect(x, y, d*2, d*2)
    }

    colorMode(RGB)
  }

  move() {
    this.d += deltaTime*this.v/1000/this.r
    if (this.d >= 1) {
      this.x += this.dir[0]*this.r
      this.y += this.dir[1]*this.r
      this.pos.unshift([this.x, this.y])
      this.pos.pop()
      this.d--
    }
  }

  resetPos() {
    this.x = sw - 2*cw
    this.y = w/2
    for (let i = 0; i < this.pos.length; i++) {
      this.pos[i][0] = sw - 2*cw
      this.pos[i][1] = w/2
    }
  }

  changeN(n) {
    this.n = n

    let pn = this.pos.length
    let bn = 0
    n = n.toString()
    for (let i = 0; i < n.length; i++) bn += parseInt(n[i])
    if (bn > pn) this.add(bn - pn)
    if (bn < pn) this.sub(pn - bn)
  }

  add(n) {
    for (let i = 0; i < n; i++) {
      const pos = this.pos[this.pos.length-1]
      this.pos.push([pos[0], pos[1]])
    }
  }

  sub(n) {
    this.pos = this.pos.slice(0, -n)
  }

  addTail() {
    const p = this.pos[this.pos.length-1]
    this.pos.push([p[0], p[1]])
    this.n++
  }
}

class Field {
  constructor() {
    this.setOps()
  }

  setOps() {
    this.ops = new Array(2)

    this.ops[0] = new Array(cn)
    for (let y = 0; y < cn; y++) {
      this.ops[0][y] = new Array(cn-1)
      for (let x = 0; x < cn-1; x++) this.ops[0][y][x] = [this.getRanOp(), ran(3)+2]
    }

    this.ops[1] = new Array(cn-1)
    for (let y = 0; y < cn-1; y++) {
      this.ops[1][y] = new Array(cn)
      for (let x = 0; x < cn; x++) this.ops[1][y][x] = [this.getRanOp(), ran(3)+2]
    }
  }

  getRanOp() {
    const r = ran(100)
    if (r < 59) return 0
    if (r < 74) return 1
    if (r < 92) return 3
    return 2
  }

  extOp(i, x, y) { this.ops[i][y][x] = [-1, 0] }

  exeOp(i, x, y, v) {
    let buf = this.ops[i][y][x]
    const op = [buf[0], buf[1]]
    if (op[0] == -1) return 0
    play("op" + op[0])
    switch (op[0]) {
      case 0: return v + op[1]
      case 1: return v - op[1]
      case 2: return v * op[1]
      case 3: return ceil(v / op[1])
    }
  }

  draw(times) {
    background("#fd9a35")

    noStroke()
    fill("white")
    rect(0, (w-cw)/2, sw, cw)
    rect(w-sw, (w-cw)/2, sw, cw)
    for (let y = 0; y < cn; y++) {
      for (let x = 0; x < cn; x++) {
        rect(x*2*cw+sw, y*2*cw+sw, cw, cw)
        if (y != cn-1) rect(x*2*cw+(cw-bw)/2+sw, (2*y+1)*cw+sw, bw, cw)
        if (x != cn-1) rect((2*x+1)*cw+sw, y*2*cw+(cw-bw)/2+sw, cw, bw)
      }
    }

    textSize(bw)
    textAlign(CENTER, CENTER)
    for (let y = 0; y < cn; y++) {
      for (let x = 0; x < cn-1; x++) {
        const op = this.ops[0][y][x]
        const col = op[0] == -1? "#fd9a35" : cols[op[0]]
        fill(col)
        rect(sw+cw*(2*x+1.1), sw+cw*2*y+(cw-bw)/2, cw*0.8, bw)

        fill("black")
        if (op[0] == -1) continue
        const s = ["+", "-", "×", "÷"][op[0]]
        text(s+op[1], sw+cw*(2*x+1.5), sw+cw*(2*y+0.5))
      }
    }

    for (let y = 0; y < cn-1; y++) {
      for (let x = 0; x < cn; x++) {
        push()
        const op = this.ops[1][y][x]
        const col = op[0] == -1? "#fd9a35" : cols[op[0]]
        fill(col)
        translate(sw+cw*2*x+(cw-bw)/2, sw+cw*(2*y+1.9))
        rotate(-Math.PI/2)
        rect(0, 0, cw*0.8, bw)

        fill("black")
        if (op[0] == -1) { pop(); continue }

        const s = ["+", "-", "×", "÷"][op[0]]
        text(s+op[1], cw*0.4, bw/2)
        pop()
      }
    }

    push()
    colorMode(HSB)
    fill((45*times+240)%360, 80, 100)
    translate(sw+cw*2*4.5+(cw-bw)/2, sw+cw*(2*2.5))
    rotate(-Math.PI/2)
    rect(0, 0, cw, bw)
    fill("black")
    pop()
  }
}

class Game {
  #f
  #p
  #trans
  #dest
  #px
  #py
  #times
  #maxN

  constructor() {
    this.#f = new Field()
    this.#p = new Player()

    this.#trans = -1.5
    this.#dest = 0

    this.#px = 0
    this.#py = 4

    this.#times = 0
    this.#maxN = 1
  }

  setDirection() {
    this.#trans = 0
    this.#p.dir[0] = this.#p.predir[0]
    this.#p.dir[1] = this.#p.predir[1]

    this.#p.x = (this.#px+1/2)*cw + sw
    this.#p.y = (this.#py+1/2)*cw + sw
  }

  setPreDir(type) {
    play("tap")

    switch (type) {
      case 0: this.#p.predir = [0, -1]; break
      case 1: this.#p.predir = [0, 1]; break
      case 2: this.#p.predir = [-1, 0]; break
      case 3: this.#p.predir = [1, 0]; break
    }
  }

  extOp() {
    let [b, x, y] = this.getPassedOpPos()
    if (this.#p.dir[1] == 0) x -= this.#p.dir[0]/2
    else y -= this.#p.dir[1]/2
    this.#f.extOp(b, x, y)
  }

  exeOp() {
    const [b, x, y] = this.getPassedOpPos()
    const n = this.#f.exeOp(b, x, y, this.#p.n)
    if (this.#maxN < n) this.#maxN = n
    if (n <= 0) this.gameOver()
    else this.#p.changeN(n)
  }

  getPassedOpPos() {
    if (this.#p.dir[1] == 0) {
      const x = (this.#px+this.#p.dir[1]-1)/2
      const y = this.#py / 2
      return [0, x, y]
    } else {
      const x = this.#px / 2
      const y = (this.#py+this.#p.dir[0]-1)/2
      return [1, x, y]
    }
  }

  gameOver() {
    this.#p.v = 0
    this.#trans = 0
    play("res")

    let l = 0
    while (p10(l+1) <= this.#maxN) l++

    let str
    if (l < 9) str = this.#maxN.toLocaleString()
    else str = (flr(this.#maxN/p10(l-4))/p10(4)).toFixed(3)+"E"+l
    get("gameOverScore").innerHTML = str + "&emsp;"

    get("gameOverStage").innerHTML = (this.#times+1) + "&emsp;"

    let ranks = ["F", "E", "D", "C", "B", "A", "S", "S+", "S++"]
    let rank
    if (l < ranks.length) rank = ranks[l]
    else if (l-7 <= 5) rank = "S+" + (l-7)
    else rank = "X"
    get("gameOverRank").innerHTML = rank + "&emsp;"

    get("gameOver").style.border = "3px solid HSL(" + (l*45+240)%360 + ", 80%, 50%)"
    get("modal").style.display = "block"
  }

  draw() {
    this.#f.draw(this.#times)
    this.#p.move()
    this.#p.draw()
    this.drawArrow()
    this.drawBar()
    this.drawScore()
  }

  drawBar() {
    push()
    stroke("black")
    strokeWeight(2)
    let g = 150*(1-this.#trans)
    if (this.#dest == 1) g += 150
    else if (this.#dest == -1) g = 0
    line(0, 1, g, 1)
    pop()
  }

  drawArrow() {
    fill("black")
    let gx = (0.5 + this.#px + (this.#dest==1? this.#p.dir[0] : 0))*cw + sw
    let gy = (0.5 + this.#py + (this.#dest==1? this.#p.dir[1] : 0))*cw + sw
    rect(gx-this.#p.r/2, gy-this.#p.r/2, this.#p.r, this.#p.r)
    stroke("black")
    line(gx+this.#p.r*this.#p.predir[0], gy+this.#p.r*this.#p.predir[1], gx+cw/3*this.#p.predir[0], gy+cw/3*this.#p.predir[1])
  }

  drawScore() {
    let l = 0
    while (p10(l+1) <= this.#p.n) l++
    const deg = (45*l+240)%360

    let str
    if (l < 12) str = this.#p.n.toLocaleString()
    else str = (flr(this.#p.n/p10(l-4))/p10(4)).toFixed(3)+"E"+l

    get("score").innerHTML = str
    get("score").style.color = "hsl("+deg+", 80%, 50%)"
  }

  stageClear() {
    this.#trans = -this.#p.pos.length*this.#p.r/cw+1
    this.#dest = -1
    this.#times++

    play("cel")
  }

  frame() {
    this.draw()
    this.#trans += this.#p.v*deltaTime/1000 / cw
    if (this.#trans >= 1) {
      if (this.#dest == 0) {
        this.extOp()
        this.setDirection()
        play("btn")
      } else if (this.#dest == 1) {
        if (this.#px == 2*cn-1 && this.#py == cn-1) {
          let n = this.#p.n
          n -= p10(this.#times+1)
          if (n <= 0) this.gameOver()
          else {
            this.#p.changeN(n)
            this.stageClear()
            return
          }
        } else if (this.#px < 0 || this.#px >= 2*cn-1 || this.#py < 0 || this.#py >= 2*cn-1) this.gameOver()
        else this.exeOp()
      } else if (this.#dest == -1) {
        this.#f = new Field()
        this.#p.resetPos()

        this.#trans = -1.5
        this.#dest = 0
        this.#px = 0
        this.#py = 4
        this.#p.v = 20 + 10*this.#times
        return
      }

      if (this.#p.v == 0) return

      this.#px += this.#p.dir[0]
      this.#py += this.#p.dir[1]

      this.#trans = 0
      this.#dest ^= 1
      this.#p.v += 0.5
    }
  }
}