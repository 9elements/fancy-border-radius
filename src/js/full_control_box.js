import AdjustableBox from './adjustable_box'
import Movable from './movable'

export default class FullControlBox extends AdjustableBox {
  initState (state) {
    let defaultState = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
      left_b: 90,
      right_b: 90,
      top_r: 90,
      bottom_r: 90,
      width: '',
      height: '',
      advancedMode: false
    }
    this.state = state == null ? defaultState : state
  }

  initHandles (moveableElems) {
    return {
      left: new Movable(moveableElems.left, this.updateState.bind(this), 'y', this.state.left),
      right: new Movable(moveableElems.right, this.updateState.bind(this), 'y', this.state.right),
      top: new Movable(moveableElems.top, this.updateState.bind(this), 'x', this.state.top),
      bottom: new Movable(moveableElems.bottom, this.updateState.bind(this), 'x', this.state.bottom),
      left_b: new Movable(moveableElems.left_b, this.updateState.bind(this), 'y', this.state.left_b),
      right_b: new Movable(moveableElems.right_b, this.updateState.bind(this), 'y', this.state.right_b),
      top_r: new Movable(moveableElems.top_r, this.updateState.bind(this), 'x', this.state.top_r),
      bottom_r: new Movable(moveableElems.bottom_r, this.updateState.bind(this), 'x', this.state.bottom_r)
    }
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
  saveUrlParams () {
    const { left, top, right, bottom, width, height, left_b, top_r, right_b, bottom_r } = this.state
    let hash = `${left}.${top}.${right}.${bottom}-${left_b}.${top_r}.${right_b}.${bottom_r}-${height}.${width}`
    this.setUrlHash(hash)
  }
}
