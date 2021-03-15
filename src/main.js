let foto

window.onload = function () {
  foto = new Foto()
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
}
