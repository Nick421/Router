import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MapComponent from "./components/map/MapComponent" ;
import Home from "./components/home/Home";
import Profile from "./components/user/Profile";
import PrivateRoute from "./components/routing/PrivateRoute";

export default function AppRouter() {
    return (
        <Router>
            <div>
                <Route exact path = "/" component = {Home} />
                <Route path = "/map" component = {MapComponent} />
                <PrivateRoute path="/profile" component={Profile} />
            </div>
        </Router>
    );
}