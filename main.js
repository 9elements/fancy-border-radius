class Movable {
  constructor (elem, onChange, axis = 'x', initPosition = 30) {
    this.axis = axis
    this.pos = initPosition
    this.elem = elem
    this.boxRect = elem.parentNode.getBoundingClientRect()
    this.onChange = onChange
    this.elem.onmousedown = this.dragMouseDown.bind(this)
    window.addEventListener('resize', this.updateOffsets.bind(this), true)
  }
  updateOffsets (e) {
    this.boxRect = this.elem.parentNode.getBoundingClientRect()
  }
  dragMouseDown (e) {
    e = e || window.event
    e.preventDefault()
    this.currentSpan = e.target
    this.currentSpan.classList.add('active')
    document.onmouseup = this.closeDragElement.bind(this)
    document.onmousemove = this.elementDrag.bind(this)
  }

  elementDrag (e) {
    e = e || window.event
    e.preventDefault()
    this.setPos(e.clientX, e.clientY)
  }
  setPos (_posX, _posY) {
    if (this.axis == 'x') {
      this.pos = this.valBetween(((_posX - 5 - this.boxRect['x']).toFixed(0) * 100 / this.boxRect['width']).toFixed(0), 0, 100)
      this.elem.style.left = this.pos + '%'
      // console.log(this.elem.style.left)
    } else {
      this.pos = this.valBetween(((_posY - 5 - this.boxRect['y']).toFixed(0) * 100 / this.boxRect['height']).toFixed(0), 0, 100)
      this.elem.style.top = this.pos + '%'
    }
    this.onChange(this.pos, this.elem.id)
  }

  closeDragElement () {
    this.currentSpan.classList.remove('active')
    document.onmouseup = null
    document.onmousemove = null
  }

  valBetween (v, min, max) {
    return (Math.min(max, Math.max(min, v)))
  }
}
class AdjustableBox {
  constructor (shapeElem, generatorElem, moveableElems, copyCode) {
    this.generatorElem = generatorElem
    this.shapeElem = shapeElem
    this.state = {
      left: 30,
      right: 30,
      top: 30,
      bottom: 30
    }
    this.handles = {
      left: new Movable(moveableElems.left, this.updateState.bind(this), 'y', 30),
      right: new Movable(moveableElems.right, this.updateState.bind(this), 'y', 30),
      top: new Movable(moveableElems.top, this.updateState.bind(this), 'x', 30),
      bottom: new Movable(moveableElems.bottom, this.updateState.bind(this), 'x', 30)
    }
    copyCode.onclick = this.setClipboard.bind(this)
  }
  setClipboard () {
    this.copyToClipboard(this.generatorElem.innerHTML)
  }
  updateOffset () {
    for (const key in this.handles) {
      this.handles[key].updateOffsets()
    }
  }
  updateState (val, key) {
    this.state[key] = val
    this.updateBorderRadius()
  }
  updateBorderRadius () {
    var brd = this.state.top + '% '
    brd += (100 - this.state.top) + '% '
    brd += (100 - this.state.bottom) + '% '
    brd += this.state.bottom + '% / '
    brd += this.state.left + '% '
    brd += this.state.right + '% '
    brd += (100 - this.state.right) + '% '
    brd += (100 - this.state.left) + '% '
    this.shapeElem.style['border-radius'] = brd
    document.getElementById('input').innerHTML = brd
    this.generatorElem.innerHTML = this.shapeElem.style['border-radius']
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
var movables = {
  left: document.getElementById('left'),
  right: document.getElementById('right'),
  bottom: document.getElementById('bottom'),
  top: document.getElementById('top')
}

var myBox = new AdjustableBox(shape, codeOutput, movables, copyCode)

var widthInput = document.getElementById('width')
var heightInput = document.getElementById('height')
widthInput.onchange = (e) => {
  box.style.width = e.target.value + 'px'
  myBox.updateOffset()
}
heightInput.onchange = (e) => {
  box.style.height = e.target.value + 'px'
  myBox.updateOffset()
}
document.getElementById('enable-advanced').onclick = (e) => {
  if (e.target.checked) {
    box.style.height = heightInput.value + 'px'
    box.style.width = widthInput.value + 'px'
  } else {
    box.style.height = '70vmin'
    box.style.width = '70vmin'
  }
  myBox.updateOffset()
}
