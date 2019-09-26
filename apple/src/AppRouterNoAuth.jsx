import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Callback from "./components/callback/Callback";
import AppRouter from "./AppRouter";
import * as auth from "./services/auth0/auth0";

export default class AppRouterNoAuth extends React.PureComponent {
  render(){
    if (auth.isLoggedin()) {
        return (
            <Router>
                <Route exact path = "/" component = {AppRouter} />
                <Route path = "/login" component = {AppRouter} />
                <Route path = "/redirect" component = {AppRouter} />
            </Router>
        );
    } else {
        return (
            <Router>
                <Route exact path = "/" component = {Home} />
                <Route path = "/login" component = {AppRouter} />
                <Route path = "/callback" component = {Callback} />
                <Route path = "/redirect" component = {AppRouter} />
            </Router>
        );
    }
  }
}