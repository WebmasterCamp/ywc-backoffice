import { Provider } from 'mobx-react'
import React from 'react'
import Loadable from 'react-loadable'
import { Route, Router } from 'react-router'

import store from './stores'
import history from './utils/history'

const Loading = () => <></>

const Admin = Loadable({
  loader: () => import('./admin'),
  loading: Loading
})

const Committee = Loadable({
  loader: () => import('./committee'),
  loading: Loading
})

const Login = Loadable({
  loader: () => import('./login'),
  loading: Loading
})

const Manager = Loadable({
  loader: () => import('./manager'),
  loading: Loading
})

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
