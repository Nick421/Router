import React from "react";
import { Navbar, Button, Alignment, Colors, Classes } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons"

import * as auth from "../../../services/auth0/auth0";

const NavBar = () => {
    const navbarStyle = {
        backgroundColor: Colors.DARK_GRAY1
        };
    return (
        <Navbar className={Classes.DARK} style={navbarStyle}>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading className="text-white-100">Tangerine</Navbar.Heading>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
            <Button className={Classes.MINIMAL} icon={IconNames.LOG_OUT} onClick={auth.userLogout}/>
            </Navbar.Group>
        </Navbar>
    )
}

export default NavBar;