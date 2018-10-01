import React, {Component} from "react";
import {injectGlobal} from "styled-components";

import Routes from "./Routes";

// global stylesheet goes here
import "antd/dist/antd.css";

injectGlobal`
    body {
        margin: 0;
        font-family: sans-serif;
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
