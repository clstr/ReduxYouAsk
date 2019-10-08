// Actions
import * as counterActions from "../actions/counter"

const initialState = { count: 0 }

export const actionCreators = {
  increment: () => ({ type: counterActions.increment }),
  decrement: () => ({ type: counterActions.decrement })
}

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === counterActions.increment) {
    return { ...state, count: state.count + 1 }
  }

  if (action.type === counterActions.decrement) {
    return { ...state, count: state.count - 1 }
  }

  return state;
}