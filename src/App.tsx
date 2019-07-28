import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import store from './common/store'
import Login from './login'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Route exact={true} path="/" component={Login} />
    </Provider>
  )
}

export default App
