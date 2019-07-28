import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import App from './App'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Kanit');

  body {
      margin: 0;
      font-family: sans-serif;
      background: #FBFCFF!important;
  }
  * {
      box-sizing: border-box;
  }
  pre {
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
  }
`

ReactDOM.render(
  <HashRouter>
    <GlobalStyle />
    <App />
  </HashRouter>,
  document.getElementById('root')
)
