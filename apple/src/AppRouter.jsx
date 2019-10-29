import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MapComponent from "./components/map/MapComponent";
import * as auth from "./services/auth0/auth0";
import * as AuthAxios from "./services/authaxios/authaxios";
import Profile from "./components/profile/Profile";

export default class AppRouter extends React.PureComponent {
    constructor() {
        super();
        this.state = { authenticated: false };
    }
    
    render(){
        if(this.state.authenticated) {
            return (
                <Router>
                    <div>
                        <Route exact path = "/" component = {MapComponent} />
                        <Route path = "/profile" component = {Profile} />
                    </div>
                </Router>
            );
        } else {
            return (
                <div>
                  <p> </p>
                </div>
              )
        }
    }
    
    async componentDidMount() {
        if (auth.isLoggedin()) {
            try {
                await auth.renewToken();
                this.setState({authenticated: true});
                AuthAxios.setBearerToken(auth.getAccessToken());
            } catch (err) {
                auth.userLogout();
            }
        } else {
            auth.userLogin();
        }
    }
}