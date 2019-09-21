import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
import MapComponent from "./components/map/MapComponent" 

export default function AppRouter() {
    return (
        <Router>
            <div>
                <Route exact path = "/" component = {MapComponent} />
            </div>
        </Router>
    );
}