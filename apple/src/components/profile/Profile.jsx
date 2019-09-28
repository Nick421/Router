import React from "react";
import { Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons"

import BaseLayout from "../base/BaseLayout";
import * as auth from "../../services/auth0/auth0";

export default class Profile extends React.PureComponent {
    render() {
        console.log(auth.getUser());
        return(
            <BaseLayout>
                <div className="flex flex-col bg-yellow-100 h-full w-screen items-center justify-center">
                    <div className="flex flex-col bg-white border-solid border-4 border-orange-200 w-1/4 py-10 px-10 items-center">
                        <img src={auth.getUser().picture} style={{width: "20rem", height: "20rem", borderRadius: "50%"}}/>
                        <h1 className="text-5xl text-orange-600 pt-4 pb-8">{auth.getUser().name}</h1>
                        <div className="flex pt-4 pb-20 flex-row justify-center w-full px-4 text-lg text-gray-600">
                            <div className="w-1/2 pr-6 text-center">
                                <p>Total trips: 420</p>
                            </div>
                            <div className="w-1/2 pl-6 text-center">
                                <p>Favourited trips: 69</p>
                            </div>
                        </div>
                        <Button text="Logout" rightIcon={IconNames.LOG_OUT} intent={Intent.WARNING} onClick={auth.userLogout} large={true}/>
                    </div>
                </div>
            </BaseLayout>
        )
    }
}