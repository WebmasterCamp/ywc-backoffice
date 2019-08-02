import { Provider } from 'mobx-react'
import React from 'react'
import { Route } from 'react-router'

import Admin from './admin'
import Committee from './committee'
import Login from './login'
import Manager from './manager'
import store from './stores'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <>
        <Route exact={true} path="/" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/committee" component={Committee} />
        <Route path="/manager" component={Manager} />
      </>
    </Provider>
  )
}

export default App
