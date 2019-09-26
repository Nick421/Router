import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Callback from "./components/callback/Callback";

import AppRouter from "./AppRouter";

export default class AppRouterNoAuth extends React.PureComponent {
  render(){
      return (
          <Router>
              <div>
                  <Route exact path = "/" component = {AppRouter} />
                  <Route path = "/callback" component = {Callback} />
              </div>
          </Router>
      );
  }
}