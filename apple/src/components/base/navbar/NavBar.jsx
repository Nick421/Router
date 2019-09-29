import React from "react";
import {Link} from "react-router-dom";
import { Navbar, Button, Alignment, Colors, Classes, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons"
import SideBar from "./../../Sidebar/SideBar";
import * as auth from "../../../services/auth0/auth0";

export default class NavBar extends React.PureComponent {
    render() {
        const navbarStyle = {
            backgroundColor: Colors.DARK_GRAY1
            };
        return (
            <Navbar className={`${Classes.DARK} w-screen`} style={navbarStyle}>
                <Navbar.Group align={Alignment.LEFT}>
                    <SideBar/>
                <Link to="/" className="flex pt-2 pl-2 justify-center focus:outline-none hover:">
                    <Icon icon={IconNames.MAP} color="#f6ad55"/>
                    <p className="pl-2 text-white text-lg hover:text:orange-500">Tangerine</p>
                </Link>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                <Link to="/profile" className="pr-5 focus:outline-none">
                    <Icon icon={IconNames.USER} color="#f6ad55"/>
                </Link>
                <Button className={Classes.MINIMAL} icon={IconNames.LOG_OUT} onClick={auth.userLogout}/>
                </Navbar.Group>
            </Navbar>
        )
    }
}
