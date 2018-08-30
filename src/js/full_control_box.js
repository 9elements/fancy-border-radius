
import AdjustableBox from './adjustable_box'
import Movable from "./movable";

export default class FullControlBox extends AdjustableBox {
  initState () {
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
  }
  initHandles (moveableElems) {
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
}
