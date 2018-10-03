// creates a reducer from an initial state and a handler function.
export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) =>
    handlers(state)[action.type]
      ? handlers(state)[action.type](action.payload)
      : state;
};

// creates an action that return object with type
export const createAction = type => {
  return payload => (payload ? {type, payload} : {type});
};

// creates an action type with namespace
export const createActionType = namespace => action => `${namespace}/${action}`;
