import React, {Component} from "react";
import {injectGlobal} from "styled-components";

import Routes from "./Routes";

// global stylesheet goes here
import "antd/dist/antd.css";

injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Kanit');

    body {
        margin: 0;
        font-family: sans-serif;
        background: #FBFCFF!important;
    }

    * {
        box-sizing: border-box;
    }
`;

class App extends Component {
  render = () => (
    <div>
      <Routes />
    </div>
  );
}

export default App;
