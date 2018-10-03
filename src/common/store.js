import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import {all} from "redux-saga/effects";

const mapReducers = {};
const mapRootSaga = [];

const saga = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const reducers = combineReducers(mapReducers);

const store = createStore(reducers, composeEnhancers(applyMiddleware(saga)));

function* rootSaga() {
  yield all(mapRootSaga);
}

saga.run(rootSaga);

// export global for debuging
if (process.env.NODE_ENV === "development" && typeof window === "object") {
  window.store = store;
}

export default store;
