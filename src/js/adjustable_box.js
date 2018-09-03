
import Movable from './movable'
export default class AdjustableBox {
  constructor ({
    shapeElemId = 'shape',
    generatorElemId = 'code',
    copyCodeId = 'copy',
    copiedCodeId = 'clipboard_copied',
    boxContainerId = 'box',
    widthInputId = 'width',
    heightInputId = 'height',
    enableAdvancedId = 'enable-advanced',
    initState = null,
    moveableElems }
    = {}) {
    this.generatorElem = document.getElementById(generatorElemId)
    this.shapeElem = document.getElementById(shapeElemId)
    this.copiedCode = document.getElementById(copiedCodeId)
    this.boxContainer = document.getElementById(boxContainerId)
    this.widthInput = document.getElementById(widthInputId)
    this.heightInput = document.getElementById(heightInputId)
    this.widthInput.onchange = () => { this.updateState(this.widthInput.value, 'width') }
    this.heightInput.onchange = () => { this.updateState(this.heightInput.value, 'height') }
    this.enableAdvanced = document.getElementById(enableAdvancedId)
    this.enableAdvanced.onclick = this.enableAdvancedOnClick.bind(this)
    this.initState(initState)
    this.initAdvanced()
    this.handles = this.initHandles(moveableElems)
    document.getElementById(copyCodeId).onclick = this.setClipboard.bind(this)
  }
  initHandles (moveableElems) {
    throw new Error('You have to implement the method initHandles!')
  }
  updateBorderRadius () {
    throw new Error('You have to implement the method updateBorderRadius!')
  }
  initState (state) {
    throw new Error('You have to implement the method initState!')
  }
  initAdvanced () {
    if (this.state.width !== '' && this.state.height !== '') {
      this.enableAdvanced.checked = true
      document.getElementById('dimension-input').classList.add('visible')
    }
  }
  enableAdvancedOnClick (e) {
    if (this.enableAdvanced.checked) {
      document.getElementById('dimension-input').classList.add('visible')
      this.state.width = this.boxContainer.offsetWidth
      this.state.height = this.boxContainer.offsetHeight
      this.updateUI()
    } else {
      document.getElementById('dimension-input').classList.remove('visible')
      this.updateState('', 'width')
      this.updateState('', 'height')
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
    this.updateUI()
  }
  updateUI () {
    this.updateBorderRadius()
    this.updateBox()
    this.saveUrlParams()
  }
  updateBox () {
    if (!this.enableAdvanced.checked) {
      return
    }
    let styleHeight = this.state.height == '' ? '' : this.state.height + 'px'
    let styleWidth = this.state.width == '' ? '' : this.state.width + 'px'
    this.boxContainer.style.height = styleHeight
    this.boxContainer.style.width = styleWidth
    this.heightInput.value = this.state.height
    this.widthInput.value = this.state.width
  }
  saveUrlParams () {
    throw new Error('You have to implement the method saveUrlParams!')
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
  static loadUrlParams (url) {
    const regex = /#(\d\d?|100)\.(\d\d?|100)\.(\d\d?|100)\.(\d\d?|100)-(?:(\d\d?|100)\.(\d\d?|100)\.(\d\d?|100)\.(\d\d?|100))?-(\d*).(\d*)/gm
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
}
