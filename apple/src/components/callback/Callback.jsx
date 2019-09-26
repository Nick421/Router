import React from "react";
import {Redirect} from "react-router-dom";

import * as auth from "../../services/auth0/auth0";
import * as authaxios from "../../services/authaxios/authaxios";

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
      authaxios.setBearerToken(auth.getAccessToken());
      this.testAPI();
      return (
        <Redirect to="/redirect"/>
      );
    }
  }

  async testAPI() {
    const djangoresponse = await authaxios.authaxiosInstance.get("/private");
    console.log(djangoresponse);
  }

  async componentDidMount() {
    await auth.parseLogin();
    this.setState({ isLoggedIn: true });
  }
}