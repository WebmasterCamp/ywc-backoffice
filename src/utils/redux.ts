// creates a reducer from an initial state and a handler function.
export const createReducer = (initialState: any, handlers: any) => {
  return (state = initialState, action: any) =>
    handlers(state)[action.type]
      ? handlers(state)[action.type](action.payload)
      : state
}

// creates an action that return object with type
export const createAction = (type: any) => {
  return (payload: any) => (payload ? { type, payload } : { type })
}

// creates an action type with namespace
export const createActionType = (namespace: any) => (action: any) =>
  `${namespace}/${action}`
