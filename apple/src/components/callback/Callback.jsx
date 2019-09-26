import React from "react";
import {Redirect} from "react-router-dom";

import * as auth from "../../services/auth0/auth0";

export default class Callback extends React.PureComponent {
  constructor() {
    super();
    this.state = { isLoggedIn: false }
  }

  render() {
    if(!this.state.isLoggedIn) {
      return (
        <div>
          <h5>Not authenticated</h5>
        </div>
      )
    } else {
      return (
        <Redirect to="/"/>
      );
    }
  }

  async componentDidMount() {
    await auth.parseLogin();
    this.setState({ isLoggedIn: true });
  }
}