import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import App from './App'

import '@ibm/plex/css/ibm-plex.css'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #F2F4F5 !important;
  }

  * {
    font-family: 'IBM Plex Thai';
    box-sizing: border-box;
  }

  pre {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }

  .candidates-table {
    tbody {
      background: #fff;
    }

    table {
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    }
  }

  @media screen {
    #print-section {
      display: none;
    }

    .screen-show {
      display: block;
    }

    .screen-hide {
      display: none;
    }
  }

  @media print {
    body * {
      visibility: hidden;
    }

    #print-section,
    #print-section * {
      font-family: 'Sarabun';
      visibility: visible;
    }

    #print-section {
      position: absolute;
      left: 0;
      top: 0;
      zoom: 1.2;
    }

    .print-hide {
      display: none;
    }

    .print-flex {
      display: flex;
    }
  }
`

ReactDOM.render(
  <HashRouter>
    <GlobalStyle />
    <App />
  </HashRouter>,
  document.getElementById('root')
)
