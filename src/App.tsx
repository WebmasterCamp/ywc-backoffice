import { Provider } from 'mobx-react'
import React from 'react'
import { Route, Router } from 'react-router'

import Admin from './admin'
import Committee from './committee'
import Login from './login'
import Manager from './manager'
import store from './stores'
import history from './utils/history'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact={true} path="/" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/committee" component={Committee} />
        <Route path="/manager" component={Manager} />
      </Router>
    </Provider>
  )
}

export default App
