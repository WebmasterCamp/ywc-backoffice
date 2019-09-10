import { Provider } from 'mobx-react'
import React from 'react'
import Loadable from 'react-loadable'
import { Route, Router } from 'react-router'

import { createGlobalStyle } from 'styled-components'
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

const Staff = Loadable({
  loader: () => import('./staff'),
  loading: Loading
})

const GlobalStyle = createGlobalStyle`
  .ant-form-item-children > textarea {
    font-family: 'Sarabun';
    line-height: 1.8;
    font-size: 16px;
  }
  .ant-form-item-control {
    font-family: 'Sarabun';
  }
`

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyle />
        <Route exact={true} path="/" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/committee" component={Committee} />
        <Route path="/staff" component={Staff} />
        <Route path="/manager" component={Manager} />
      </Router>
    </Provider>
  )
}

export default App
