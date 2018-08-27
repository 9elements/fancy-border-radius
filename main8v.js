class Movable {
  constructor (elem, onChange, axis = 'x', initPosition = 30) {
    this.axis = axis
    this.pos = initPosition
    this.elem = elem

    this.onChange = onChange
    this.elem.onmousedown = this.dragMouseDown.bind(this)
    this.elem.ontouchstart = this.dragMouseDown.bind(this)
  }
  dragMouseDown (e) {
    e = e || window.event
    e.preventDefault()
    this.currentSpan = e.target
    this.currentSpan.classList.add('active')

    document.onmouseup = this.closeDragElement.bind(this)
    document.ontouchend = this.closeDragElement.bind(this)

    document.onmousemove = this.elementDrag.bind(this)
    document.ontouchmove = this.elementDrag.bind(this)
  }
  elementDrag (e) {
    e = e || window.event
    if (typeof TouchEvent !== 'undefined' && e instanceof TouchEvent) {
      var touchobj = e.changedTouches[0] // first finger
      this.setPos(touchobj.clientX, touchobj.clientY)
    } else {
      this.setPos(e.clientX, e.clientY)
    }
  }
  setPos (_posX, _posY) {
    let boxRect = this.elem.parentNode.getBoundingClientRect()
    if (this.axis == 'x') {
      this.pos = this.valBetween(((_posX - 5 - boxRect['x']).toFixed(0) * 100 / boxRect['width']).toFixed(0), 0, 100)
      this.elem.style.left = this.pos + '%'
    } else {
      this.pos = this.valBetween(((_posY - 5 - boxRect['y']).toFixed(0) * 100 / boxRect['height']).toFixed(0), 0, 100)
      this.elem.style.top = this.pos + '%'
    }
    this.onChange(this.pos, this.elem.id)
  }

  closeDragElement () {
    this.currentSpan.classList.remove('active')
    document.onmouseup = null
    document.onmousemove = null
    document.ontouchend = null
    document.ontouchmove = null
  }

  valBetween (v, min, max) {
    return (Math.min(max, Math.max(min, v)))
  }
}
class AdjustableBox {
  constructor (shapeElem, generatorElem, moveableElems, copyCode, copiedCode) {
    this.generatorElem = generatorElem
    this.shapeElem = shapeElem
    this.copiedCode = copiedCode
    this.state = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
      left_b: 90,
      right_b: 90,
      top_r: 90,
      bottom_r: 90
    }
    this.handles = {
      left: new Movable(moveableElems.left, this.updateState.bind(this), 'y', 10),
      right: new Movable(moveableElems.right, this.updateState.bind(this), 'y', 10),
      top: new Movable(moveableElems.top, this.updateState.bind(this), 'x', 10),
      bottom: new Movable(moveableElems.bottom, this.updateState.bind(this), 'x', 10),
      left_b: new Movable(moveableElems.left_b, this.updateState.bind(this), 'y', 10),
      right_b: new Movable(moveableElems.right_b, this.updateState.bind(this), 'y', 10),
      top_r: new Movable(moveableElems.top_r, this.updateState.bind(this), 'x', 10),
      bottom_r: new Movable(moveableElems.bottom_r, this.updateState.bind(this), 'x', 10)
    }
    copyCode.onclick = this.setClipboard.bind(this)
  }
  setClipboard () {
    this.copyToClipboard(this.generatorElem.innerHTML)
    this.copiedCode.innerHTML = '<div class="alert">Copied to clipboard 👍</div>'
    setTimeout(() => {
      this.copiedCode.innerHTML = ''
    }
      , 2000)
  }
  updateState (val, key) {
    this.state[key] = val
    this.updateBorderRadius()
  }
  updateBorderRadius () {
    var brd = this.state.top + '% '
    brd += (100 - this.state.top_r) + '% '
    brd += (100 - this.state.bottom_r) + '% '
    brd += this.state.bottom + '% / '
    brd += this.state.left + '% '
    brd += this.state.right + '% '
    brd += (100 - this.state.right_b) + '% '
    brd += (100 - this.state.left_b) + '% '
    this.shapeElem.style['border-radius'] = brd
    this.generatorElem.innerHTML = brd
  }
  copyToClipboard (str) {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    const selected =
      document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
      document.getSelection().removeAllRanges()
      document.getSelection().addRange(selected)
    }
  };
}

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

var myBox = new AdjustableBox(shape, codeOutput, movables, copyCode, copiedCode)

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
