import * as React from "react";

import{ Button} from "@blueprintjs/core";
import Favourites from "./../Favourites/Favourites";
import History from "./../history/History";
import AccountDetail from "./../AccountDetail/AccountDetail";

export default class SideBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            isHistoryOpen: false,
            isFavouriteOpen: false,
            isAccountDetailOpen: false,
        }
    }

    render(){
        const renderMenu = (
            <div>
                <div 
                    className="block absolute bg-black bg-center shadow overflow-hidden h-100 w-40 z-20"
                    style={{ opacity: "0.8", left: "0rem", top: '3.125rem', height:'50rem', width: "20rem"}}>        
                    <ul>
                        <li>
                        <a 
                            href= "#" className="block p-10 text-xl text-grey-darker text-white font-bold" 
                            onClick={this.handleFavouriteClick} 
                            style={{fontSize: "2.5rem", fontFamily: "alegreya", color: "white", textDecoration:  "none" }}>
                            Favourites
                        </a>
                        </li>
                        <li>
                        <a 
                            href= "#"
                            className="block p-10 text-xl text-grey-darker text-white font-bold" 
                            onClick={this.handleHistoryClick}
                            style={{fontSize: "2.5rem", fontFamily: "alegreya", color: "white", textDecoration:  "none" }}
                        >
                            History
                        </a>
                        </li>
                        <li>
                        <a 
                            href= "#" className="block p-10 text-xl text-grey-darker text-white font-bold" 
                            onClick={this.handleAccountDetailClick}
                            style={{fontSize: "2.5rem", fontFamily: "alegreya", color: "white", textDecoration:  "none" }}
                        >
                            Account Detail
                        </a>
                        </li>
                    </ul>
                </div>
                <History
                    isOpen={this.state.isHistoryOpen}
                    closeHandler={this.handleHistoryClick}
                />
            </div>
        )

        return (
             <div>
                <Button
                    className="bg-blue-500 hover:bg-blue-700 text-blue-600 hover:text-red-600 font-bold py-2 px-4 rounded" 
                    onClick={this.handleClick}
                >
                    Menu
                </Button>
                { this.state.isOpen ? renderMenu : null }
            </div>   
        );
    }
    

    handleClick = () => {
        this.setState(state => ({isOpen: !state.isOpen}));
    }

    handleHistoryClick = () => {
        this.setState(state => ({isHistoryOpen: !state.isHistoryOpen}));
    }

    handleFavouriteClick = () => {
        this.setState(state => ({isFavouriteOpen: !state.isFavouriteOpen}));
    }

    handleAccountDetailClick = () => {
        this.setState(state => ({isAccountDetailOpen: !state.isAccountDetailOpen}));
    }
}


