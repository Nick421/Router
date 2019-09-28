import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MapComponent from "./components/map/MapComponent";
import Loading from "./components/base/loading/Loading";
import * as auth from "./services/auth0/auth0";
import * as AuthAxios from "./services/authaxios/authaxios";

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
                        <Route path = "/redirect" component = {Loading} />
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