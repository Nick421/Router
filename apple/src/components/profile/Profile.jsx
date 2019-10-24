import React from "react";
import { Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons"

import BaseLayout from "../base/BaseLayout";
import Loading from "../base/loading/Loading";
import * as auth from "../../services/auth0/auth0";
import * as AuthAxios from "../../services/authaxios/authaxios";
import * as HistoryServices from "../../services/history/history";
import * as FavouriteServices from "../../services/favourite/favourite";

export default class Profile extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
          favouriteCount: 0,
          historyCount: 0,
          isLoading: false,
        };
    }

    async componentDidMount () {
        this.setState({ isLoading: true });
        AuthAxios.setBearerToken(auth.getAccessToken());
        await this.getUserServiceData();
    }

    render() {
        const loading = (
            <div className="h-screen">
                <Loading/>
            </div>
        )
        const renderProfile = (
            <div className="flex flex-col bg-yellow-100 h-full w-screen items-center justify-center">
                <div className="flex flex-col bg-white border-solid border-4 border-orange-200 w-84 py-10 px-10 items-center">
                    <img src={auth.getUser().picture} style={{width: "20rem", height: "20rem", borderRadius: "50%"}}/>
                    <h1 className="text-5xl text-orange-600 pt-4 pb-8">{auth.getUser().name}</h1>
                    <div className="flex pt-4 pb-20 flex-row justify-center w-full px-4 text-lg text-gray-600">
                        <div className="w-1/2 pr-6 text-center">
                            <p>Total trips: {this.state.historyCount}</p>
                        </div>
                        <div className="w-1/2 pl-6 text-center">
                            <p>Favourited trips: {this.state.favouriteCount}</p>
                        </div>
                    </div>
                    <Button text="Logout" rightIcon={IconNames.LOG_OUT} intent={Intent.WARNING} onClick={auth.userLogout} large={true}/>
                </div>
            </div>
        );
        return(
            <BaseLayout>
                { this.state.isLoading ? loading : renderProfile }
            </BaseLayout>
        );
    }

    getUserServiceData = async () => {
        const [ historyList, favouriteList ] = await Promise.all([HistoryServices.getAllHistory(), FavouriteServices.getAllFavourites()]);
        this.setState({
            favouriteCount: favouriteList.length,
            historyCount: historyList.length,
            isLoading: false,
        });
        return;
    }
}