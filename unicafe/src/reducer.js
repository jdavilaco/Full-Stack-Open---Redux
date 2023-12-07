const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goodState = { ...state }
      Object.assign(goodState, {good: state.good + 1})
      return goodState
    case 'OK':
      const okState = { ...state }
      Object.assign(okState, {ok: state.ok + 1})
      return okState
    case 'BAD':
      const badState = { ...state }
      Object.assign(badState, {bad: state.bad + 1})
      return badState
    case 'ZERO':
      const zeroState = { ...initialState }
      return zeroState
    default: return state
  } 
}

export default counterReducer
