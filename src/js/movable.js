export default class Movable {
  constructor (elem, onChange, axis = 'x', initPosition = 30, onDragEnd = () => {}) {
    this.axis = axis
    this.pos = initPosition
    this.elem = elem

    this.onChange = onChange
    this.onDragEnd = onDragEnd
    this.elem.onmousedown = this.dragMouseDown.bind(this)
    this.elem.ontouchstart = this.dragMouseDown.bind(this)
    this.setInitPos(initPosition)
    this.onChange(this.pos, this.elem.id)
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
  setInitPos(pos) {
    if (this.axis == 'x') {
      this.elem.style.left = pos + '%'
    } else {
      this.elem.style.top = pos + '%'
    }
  }
  setPos (_posX, _posY) {
    let boxRect = this.elem.parentNode.getBoundingClientRect()
    if (this.axis == 'x') {
      this.pos = this.valBetween(((_posX - 5 - boxRect['left']).toFixed(0) * 100 / boxRect['width']).toFixed(0), 0, 100)
      this.elem.style.left = this.pos + '%'
    } else {
      this.pos = this.valBetween(((_posY - 5 - boxRect['top']).toFixed(0) * 100 / boxRect['height']).toFixed(0), 0, 100)
      this.elem.style.top = this.pos + '%'
    }
    this.onChange(this.pos, this.elem.id)
  }

  closeDragElement () {
    this.currentSpan.classList.remove('active')
    this.onDragEnd()
    document.onmouseup = null
    document.onmousemove = null
    document.ontouchend = null
    document.ontouchmove = null
  }

  valBetween (v, min, max) {
    return (Math.min(max, Math.max(min, v)))
  }
}