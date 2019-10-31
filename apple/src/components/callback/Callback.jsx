import React from "react";
import {Redirect} from "react-router-dom";

import * as auth from "../../services/auth0/auth0";
import * as AuthAxios from "../../services/authaxios/authaxios";

export default class Callback extends React.PureComponent {
  constructor() {
    super();
    this.state = { isLoggedIn: false }
  }
  
  /** Initiate the axios instance header with the authentication bearer token and
   *  redirect if the user is logged in
   */
  render() {
    if(!this.state.isLoggedIn) {
      return (
        <div>
          <h5>Not authenticated</h5>
        </div>
      )
    } else {
      AuthAxios.setBearerToken(auth.getAccessToken());
      return (
        <Redirect to="/profile"/>
      );
    }
  }

  /** Parse and validate the callback url hash */
  async componentDidMount() {
    await auth.parseLogin();
    this.setState({ isLoggedIn: true });
  }
}