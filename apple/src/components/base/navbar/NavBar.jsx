import React from "react";
import { Navbar, Alignment, Button, Colors, Classes } from "@blueprintjs/core";
import { withRouter } from "react-router-dom";

class NavBar extends React.PureComponent {
    render() {
        const navbarStyle = {
            backgroundColor: Colors.DARK_GRAY1
          };
        return (
            <Navbar className={Classes.DARK} style={navbarStyle} >
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading className="text-white-100">Tangarine</Navbar.Heading>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Button className="bp3-minimal" icon="home" text="Home" onClick={()=>{this.props.history.push("/")}}/>
                </Navbar.Group>
            </Navbar>
        )
    }
}

export default withRouter(NavBar);