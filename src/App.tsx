import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import Admin from './admin'
import store from './common/store'
import Login from './login'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Route exact={true} path="/" component={Login} />
      <Route path="/admin" component={Admin} />
    </Provider>
  )
}

export default App
