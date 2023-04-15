window.AudioContext = window.AudioContext || window.webkitAudioContext

const F32A = Float32Array
const PI = Math.PI
const sin = n => n%PI == 0? 0 : Math.sin(n)
const cos = n => (n-PI/2)%PI==0? 0 : Math.cos(n)
const round = Math.round
const pow = Math.pow

const cx = new AudioContext()
const real = [ 0, 0 ]
const imag = [ 0, 1 ]
const xLabel = new Array(256)

const max = v => {
  m = v[0]
  for (i=1; i<v.length; i++) m = Math.max(m,v[i])
  return m
}
var l = 1
var data = new Array(256)
for (i=0; i<256; i++) {
  data[i] = sin(i/255*2*PI)
  xLabel[i] = Math.round(i/255)
}

var chart = new Chart( $("#wave"), {
  type: "line",
  data: {
    labels: xLabel,
    datasets: [{
      label: "Wave",
      data: data,
      borderColor: "#555",
      pointRadius: 0,
      fill: false
    }]
  },
  options: {
    responsive: false,
    title: {
      display: true,
      text: "Audio Wave"
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 1,
          min: -1
        }
      }],
      xAxes: [{
        ticks: {
          autoSkip: true,
          autoSkipPadding: 147.5
        }
      }]
    }
  }
})
    

function f() {
  const osc1 = cx.createOscillator()

  osc1.connect(cx.destination)

  osc1.detune.value = 0

  setWave(osc1, real, imag)

  osc1.start(cx.currentTime)
  osc1.stop(cx.currentTime+1)
}

function setWave(osc, real, imag) {
  const wav = cx.createPeriodicWave(
    new F32A(real), new F32A(imag)
  )
  osc.setPeriodicWave(wav)
}

function drawWave() {
  for (i=0; i<256; i++) {
    for (j=1; j<=l; j++) {
      if (j==1) {
        data[i] = imag[j]*sin(i/255*j*2*PI)
        data[i] += real[j]*cos(i/255*j*2*PI)
      } else {
        data[i] += imag[j]*sin(i/255*j*2*PI)
        data[i] += real[j]*cos(i/255*j*2*PI)
      }
    }
  }
  m = max(data)
  for (i=0; i<256; i++) data[i] /= m
  chart.data.datasets[0].data = data
  chart.update()
}

function c(e) {
  obj = e.target
  id = obj.id
  t = id.slice(-1)
  id = "#"+id.slice(0,-1)+(t=="n"?"r":"n")
  obj.value = Math.min(Math.max(0,obj.value),100)
  $(id).val(obj.value)

  if (id[1]=="s")
    imag[parseInt(id.slice(2,-1))] = obj.value
  else
    real[parseInt(id.slice(2,-1))] = obj.value

  drawWave()
}
$("#s1n").on("change",c)
$("#s1r").on("change",c)
$("#c1n").on("change",c)
$("#c1r").on("change",c)

function pbf(e) {
  if (l==4096) return
  l += 1

  real.push(0)
  imag.push(1)

  tagB = "<tr id='tr"+l+"'>"
  s = "<td><input type='number' id='s"+l+"n' "
  s += "min=0 max=100 step=0.01 value=1>sin "
  s += l+"θ</td>"
  s += "<td><input type='range' id='s"+l+"r' "
  s += "min=0 max=100 step=0.01 value=1>"
  cs = "<td><input type='number' id='c"+l+"n' "
  cs += "min=0 max=100 step=0.01 value=0>cos "
  cs += l+"θ</td>"
  cs += "<td><input type='range' id='c"+l+"r' "
  cs += "min=0 max=100 step=0.01 value=0></td>"
  tagE = "</tr>"
  
  $("#tr"+(l-1)).after(tagB+s+cs+tagE)

  drawWave()

  $("#s"+l+"n").on("change",c)
  $("#s"+l+"r").on("change",c)
  $("#c"+l+"n").on("change",c)
  $("#c"+l+"r").on("change",c)

}
$("#pb").on("click",pbf)

function mbf(e) {
  if (l==1) return
  l -= 1

  real.pop()
  imag.pop()

  drawWave()

  $("#tr"+(l+1)).remove()
}
$("#mb").on("click",mbf)

function wbSine(e) {
  while (l>1) mbf()
  imag[1] = 1
  real[1] = 0
  $("#s1n").val(1)
  $("#s1r").val(1)
  $("#c1n").val(0)
  $("#c1r").val(0)
  drawWave()
}
$("#wbSi").on("click",wbSine)

function wbSawtooth(e) {
  while (l>30) mbf()
  while (l<30) pbf()
  for (i=1; i<=l; i++) {
    n = round(100/i*100)/100
    imag[i] = n
    real[i] = 0
    $("#s"+i+"n").val(n)
    $("#s"+i+"r").val(n)
    $("#c"+i+"n").val(0)
    $("#c"+i+"r").val(0)
  }
  drawWave()
}
$("#wbSa").on("click",wbSawtooth)

function wbSquare(e) {
  while (l>30) mbf()
  while (l<30) pbf()
  for (i=1; i<=l; i++) {
    n = i%2==1? round(100/i*100)/100 : 0
    imag[i] = n
    real[i] = 0
    $("#s"+i+"n").val(n)
    $("#s"+i+"r").val(n)
    $("#c"+i+"n").val(0)
    $("#c"+i+"r").val(0)
  }
  drawWave()
}
$("#wbSq").on("click",wbSquare)

function wbTriangle(e) {
  while (l>15) mbf()
  while (l<15) pbf()
  for (i=1; i<=l; i++) {
    n = i%2==1? round(100/pow(i,2)*100)/100 : 0
    imag[i] = 0
    real[i] = n
    $("#s"+i+"n").val(0)
    $("#s"+i+"r").val(0)
    $("#c"+i+"n").val(n)
    $("#c"+i+"r").val(n)
  }
  drawWave()
}
$("#wbTr").on("click",wbTriangle)