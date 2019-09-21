import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MapComponent from "./components/map/MapComponent" ;
import Home from "./components/home/Home";

export default function AppRouter() {
    return (
        <Router>
            <div>
                <Route exact path = "/" component = {Home} />
                <Route path = "/map" component = {MapComponent} />
            </div>
        </Router>
    );
}