let foto
let rotateRate

window.onload = function () {
  foto = new Foto()
  rotateRate = document.querySelector(".rotate_rate")
}

function selectImage() {
  document.querySelector("#foto-file").click()
}

function makeGray() {
  foto.grayscale()
}

function makeBright() {
  foto.makeBright()
}

function makeDark() {
  foto.makeDark()
}

function makeBlur() {
  foto.applyBlurFilter()
}

function makeEmboss() {
  foto.applyEmbossFilter()
}

function makeSharp() {
  foto.applySharpFilter()
}

function download() {
  foto.export()
}

function crop() {
  foto.cropSelected()
}

function flipVertically() {
  foto.flipVertically()
}

function rotate(item) {
  foto.rotate(item.value)
  rotateRate.innerHTML = item.value
}
