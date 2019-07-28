import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

const mapReducers = {}
const mapRootSaga: any[] | never[] = []

const saga = createSagaMiddleware()

const composeEnhancers = composeWithDevTools({})

const reducers = combineReducers(mapReducers)

const store = createStore(reducers, composeEnhancers(applyMiddleware(saga)))

function* rootSaga() {
  yield all(mapRootSaga)
}

saga.run(rootSaga)

export default store
