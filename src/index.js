import './scss/main.scss'
import SimpleControlBox from './js/simple_control_box'

function loadUrlParams (url) {
  const regex = /#(\d\d?)\.(\d\d?)\.(\d\d?)\.(\d\d?)-(?:(\d\d?)\.(\d\d?)\.(\d\d?)\.(\d\d?))?-(\d*).(\d*)/gm
  let paramsToAttribute = ['left', 'top', 'right', 'bottom', 'left_b', 'top_r', 'right_b', 'bottom_r', 'height', 'width']
  let attributes = {}
  let m
  if (!regex.test(url)) {
    return null
  }
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
  top: document.getElementById('top')
}
let params = loadUrlParams(window.location.href)
var myBox = new SimpleControlBox({moveableElems: movables, initState: params})
