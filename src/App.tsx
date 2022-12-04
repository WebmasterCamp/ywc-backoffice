import { Provider } from 'mobx-react'
import React, { lazy, Suspense } from 'react'
import { Route, Router } from 'react-router'

import { Global, css } from '@emotion/react'
import store from './stores'
import history from './utils/history'

const Admin = lazy(() => import('./admin'))
const Committee = lazy(() => import('./committee'))
const Login = lazy(() => import('./login'))
const Manager = lazy(() => import('./manager'))
const Staff = lazy(() => import('./staff'))
const CallCenter = lazy(() => import('./callcenter'))

function GlobalStyle() {
  return (
    <Global
      styles={css`
        .ant-form-item-children > textarea {
          font-family: 'Sarabun';
          line-height: 1.8;
          font-size: 16px;
        }
        .ant-form-item-control {
          font-family: 'Sarabun';
        }
        .ant-avatar > img {
          height: auto;
        }
      `}
    />
  )
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyle />
        <Suspense fallback={<></>}>
          <Route exact={true} path="/" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/committee" component={Committee} />
          <Route path="/staff" component={Staff} />
          <Route path="/manager" component={Manager} />
          <Route path="/callcenter" component={CallCenter} />
        </Suspense>
      </Router>
    </Provider>
  )
}

export default App
