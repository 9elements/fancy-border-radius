import './scss/main.scss'
import FullControlBox from "./js/full_control_box";

var box = document.getElementById('box')
var shape = document.getElementById('shape')
var codeOutput = document.getElementById('code')
var copyCode = document.getElementById('copy')
var copiedCode = document.getElementById('clipboard_copied')
var movables = {
  left: document.getElementById('left'),
  right: document.getElementById('right'),
  bottom: document.getElementById('bottom'),
  top: document.getElementById('top'),
  left_b: document.getElementById('left_b'),
  right_b: document.getElementById('right_b'),
  bottom_r: document.getElementById('bottom_r'),
  top_r: document.getElementById('top_r')
}

var myBox = new FullControlBox(shape, codeOutput, movables, copyCode, copiedCode)

var widthInput = document.getElementById('width')
var heightInput = document.getElementById('height')
widthInput.onchange = (e) => {
  box.style.width = e.target.value + 'px'
}
heightInput.onchange = (e) => {
  box.style.height = e.target.value + 'px'
}
document.getElementById('enable-advanced').checked = false
document.getElementById('enable-advanced').onclick = (e) => {
  if (e.target.checked) {
    document.getElementById('dimension-input').classList.add('visible')
    widthInput.value = box.offsetWidth
    heightInput.value = box.offsetHeight
    box.style.height = heightInput.value + 'px'
    box.style.width = widthInput.value + 'px'
  } else {
    document.getElementById('dimension-input').classList.remove('visible')
    box.style.height = ''
    box.style.width = ''
  }
}

console.log("test")