import AdjustableBox from './adjustable_box'
import Movable from './movable'

export default class SimpleControlBox extends AdjustableBox {
  initState (state) {
    let defaultState = {
      left: 30,
      right: 30,
      top: 30,
      bottom: 30,
      width: '',
      height: '',
      advancedMode: false
    }
    this.state = state == null ? defaultState : state
  }
  initHandles (moveableElems) {
    return {
      left: new Movable(moveableElems.left, this.updateState.bind(this), 'y', this.state.left, this.saveUrlParams.bind(this)),
      right: new Movable(moveableElems.right, this.updateState.bind(this), 'y', this.state.right, this.saveUrlParams.bind(this)),
      top: new Movable(moveableElems.top, this.updateState.bind(this), 'x', this.state.top, this.saveUrlParams.bind(this)),
      bottom: new Movable(moveableElems.bottom, this.updateState.bind(this), 'x', this.state.bottom, this.saveUrlParams.bind(this))
    }
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
  saveUrlParams () {
    const { left, top, right, bottom, width, height } = this.state
    let hash = `${left}.${top}.${right}.${bottom}--${height}.${width}`
    this.setUrlHash(hash)
  }
}
