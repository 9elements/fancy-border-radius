import './scss/main.scss'
import FullControlBox from "./js/full_control_box";

function loadUrlParams (url) {
  const regex = /#(\d\d?)\.(\d\d?)\.(\d\d?)\.(\d\d?)-(?:(\d\d?)\.(\d\d?)\.(\d\d?)\.(\d\d?))?-(\d*).(\d*)/gm
  let paramsToAttribute = ['left', 'top', 'right', 'bottom', 'left_b', 'top_r', 'right_b', 'bottom_r', 'height', 'width']
  let attributes = {}
  let m
  if (!regex.test(url)) {
    return null
  }
  regex.lastIndex = 0
  while ((m = regex.exec(url)) !== null) {
    m.forEach((match, groupIndex) => {
      if (groupIndex != 0) {
        attributes[paramsToAttribute[groupIndex - 1]] = match
      }
    })
  }
  return attributes
}

var box = document.getElementById('box')
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
let params = loadUrlParams(window.location.href)
var myBox = new FullControlBox({moveableElems: movables, initState: params})
