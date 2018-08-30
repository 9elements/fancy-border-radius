
import Movable from "./movable";

export default class AdjustableBox {
  constructor (shapeElem, generatorElem, moveableElems, copyCode, copiedCode) {
    this.generatorElem = generatorElem
    this.shapeElem = shapeElem
    this.copiedCode = copiedCode
    this.initHandles(moveableElems)
    this.initState()
    copyCode.onclick = this.setClipboard.bind(this)
  }
  initState() {
    this.state = {
      left: 30,
      right: 30,
      top: 30,
      bottom: 30
    }
  }
  initHandles(moveableElems) {
    this.handles = {
      left: new Movable(moveableElems.left, this.updateState.bind(this), 'y', 30),
      right: new Movable(moveableElems.right, this.updateState.bind(this), 'y', 30),
      top: new Movable(moveableElems.top, this.updateState.bind(this), 'x', 30),
      bottom: new Movable(moveableElems.bottom, this.updateState.bind(this), 'x', 30)
    }
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
    brd += (100 - this.state.top) + '% '
    brd += (100 - this.state.bottom) + '% '
    brd += this.state.bottom + '% / '
    brd += this.state.left + '% '
    brd += this.state.right + '% '
    brd += (100 - this.state.right) + '% '
    brd += (100 - this.state.left) + '% '
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
