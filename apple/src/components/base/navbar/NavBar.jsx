import React from "react";
import { Navbar, Alignment, Button, Colors, Classes } from "@blueprintjs/core";
import { useAuth0 } from "./../../../react-auth0-wrapper";

const NavBar = () => {

    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const navbarStyle = {
        backgroundColor: Colors.DARK_GRAY1
        };
    return (
        <Navbar className={Classes.DARK} style={navbarStyle}>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading className="text-white-100">Tangarine</Navbar.Heading>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                {!isAuthenticated && (
                    <Button className="bp3-minimal" icon="files" text="Login" onClick={() => loginWithRedirect({})}/>
                )}
                {isAuthenticated && (
                    <div>
                        <Button className="bp3-minimal" icon="files" text="Logout" onClick={() => logout()}/>
                        <Button className="bp3-minimal" icon="home" text="Home" onClick={()=>{}}/>
                    </div>
                )}
            </Navbar.Group>
        </Navbar>
    )
}

export default NavBar;