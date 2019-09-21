import React from "react";
import NavBar from "./navbar/NavBar"

export default class BaseLayout extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <NavBar/>
                {this.props.children}
            </React.Fragment>
        )
    }
}