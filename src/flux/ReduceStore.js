import { Store } from "./Store";

export class ReduceStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);
  }
  // Common signature of a reducer
  reduce(state, action) {
    throw new Error(
      "Subclasses must implement reduce method oof a Flux ReduceStore"
    );
  }

  __onDispatch(action) {
    const newState = reduce(this.__state, action);
    if (newState !== this.__state) {
      this.__state = newState;
      this.__emitChange();
    }
  }
}
