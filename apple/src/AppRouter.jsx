import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MapComponent from "./components/map/MapComponent" ;
import Home from "./components/home/Home";
import * as auth from "./services/auth0/auth0";

export default class AppRouter extends React.PureComponent {
    constructor() {
        super();
        this.state = { authenticated: false };
    }
    
    render(){
        if(this.state.authenticated) {
            console.log(auth.getAccessToken());
            return (
                <Router>
                    <div>
                        <Route exact path = "/" component = {Home} />
                        <Route path = "/map" component = {MapComponent} />
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
            } catch (err) {
                auth.userLogout();
            }
        } else {
            auth.userLogin();
        }
    }
}