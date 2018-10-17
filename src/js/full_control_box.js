import AdjustableBox from './adjustable_box'
import Movable from './movable'

export default class FullControlBox extends AdjustableBox {
  initState (state) {
    let defaultState = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
      leftBottom: 90,
      rightBottom: 90,
      topRight: 90,
      bottomRight: 90,
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
      bottom: new Movable(moveableElems.bottom, this.updateState.bind(this), 'x', this.state.bottom, this.saveUrlParams.bind(this)),
      leftBottom: new Movable(moveableElems.leftBottom, this.updateState.bind(this), 'y', this.state.leftBottom, this.saveUrlParams.bind(this)),
      rightBottom: new Movable(moveableElems.rightBottom, this.updateState.bind(this), 'y', this.state.rightBottom, this.saveUrlParams.bind(this)),
      topRight: new Movable(moveableElems.topRight, this.updateState.bind(this), 'x', this.state.topRight, this.saveUrlParams.bind(this)),
      bottomRight: new Movable(moveableElems.bottomRight, this.updateState.bind(this), 'x', this.state.bottomRight, this.saveUrlParams.bind(this))
    }
  }
  updateBorderRadius () {
    var brd = this.state.top + '% '
    brd += (100 - this.state.topRight) + '% '
    brd += (100 - this.state.bottomRight) + '% '
    brd += this.state.bottom + '% / '
    brd += this.state.left + '% '
    brd += this.state.right + '% '
    brd += (100 - this.state.rightBottom) + '% '
    brd += (100 - this.state.leftBottom) + '% '
    this.shapeElem.style['border-radius'] = brd
    this.generatorElem.innerHTML = brd
  }
  saveUrlParams () {
    const { left, top, right, bottom, width, height, leftBottom, topRight, rightBottom, bottomRight } = this.state
    let hash = `${left}.${top}.${right}.${bottom}-${leftBottom}.${topRight}.${rightBottom}.${bottomRight}-${height}.${width}`
    this.setUrlHash(hash)
  }
}
