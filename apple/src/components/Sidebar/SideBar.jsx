import React from "react";

import { Button, Intent } from "@blueprintjs/core";
import Favourites from "../Favourites/Favourites";
import History from "./../history/History";

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isHistoryOpen: false,
            isFavouriteOpen: false,
            isAccountDetailOpen: false,
            updateHistory: 0,
            updateFavourite: 0,
        }
    }

    render() {
        const menuTextStyle = { fontFamily: "alegreya", color: "white" };
        const renderMenu = (
            <div>
                <div
                    className="flex justify-center absolute bg-orange-500 bg-center left-0 z-20 w-56"
                    style={{ opacity: "1", top: '3.125rem', height: '50rem' }}>
                    <ul>
                        <li>
                            <a
                                className="block py-8 text-2xl text-grey-darker text-white font-bold"
                                onClick={this.handleFavouriteClick}
                                style={menuTextStyle}>
                                Favourites
                            </a>
                        </li>
                        <li>
                            <a
                                className="block py-8 text-2xl text-grey-darker text-white font-bold"
                                onClick={this.handleHistoryClick}
                                style={menuTextStyle}
                            >
                                History
                            </a>
                        </li>
                    </ul>
                    <div className="absolute bottom-0 mb-3 text-center">
                        <p>Tangerine</p>
                        <p className="text-xs">© by ELEC3609 Group 14</p>
                    </div>
                </div>
                <Favourites
                    isOpen={this.state.isFavouriteOpen}
                    closeHandler={this.handleFavouriteClick}
                    updateFavourite={this.state.updateFavourite}
                />
                <History
                    isOpen={this.state.isHistoryOpen}
                    closeHandler={this.handleHistoryClick}
                    updateHistory={this.state.updateHistory}
                />
            </div>
        )

        return (
            <div>
                <Button
                    className="font-bold mr-2"
                    intent={Intent.WARNING}
                    onClick={this.handleClick}
                >
                    Menu
                </Button>
                {this.state.isOpen ? renderMenu : null}
            </div>
        );
    }


    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleHistoryClick = () => {
        this.setState({
            updateFavourite: this.state.updateFavourite + 1,
            isHistoryOpen: !this.state.isHistoryOpen,
        });
    }

    handleFavouriteClick = () => {
        this.setState({
            updateHistory: this.state.updateHistory + 1,
            isFavouriteOpen: !this.state.isFavouriteOpen,
        });
    }
}


