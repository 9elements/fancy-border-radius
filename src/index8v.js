import './scss/main.scss'
import FullControlBox from "./js/full_control_box";

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
let params = FullControlBox.loadUrlParams(window.location.href)
var myBox = new FullControlBox({moveableElems: movables, initState: params})
