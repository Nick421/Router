import React from "react";
import NavBar from "./navbar/NavBar"

export default class BaseLayout extends React.PureComponent {
    render() {
        return (
            <div className="h-screen flex flex-col">
                <div className="relative z-20">
                    <NavBar/>
                </div>
                {this.props.children}
            </div>
        )
    }
}