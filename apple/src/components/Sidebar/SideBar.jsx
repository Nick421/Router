import * as React from "react";

import{ Nav, Button, Classes, Menu, MenuItem} from "@blueprintjs/core";
import BaseLayout from "./../base/BaseLayout";
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

        this.handleClick = this.handleClick.bind(this);
        this.handleHistoryClick = this.handleHistoryClick.bind(this);
        this.handleFavouriteClick = this.handleFavouriteClick.bind(this);
        this.handleAccountDetailClick = this.handleAccountDetailClick.bind(this);
        this.handleHistoryClose = this.handleHistoryClose.bind(this);
    }

    handleClick(){
        this.setState(state => ({isOpen: !state.isOpen}));
    }

    handleHistoryClick(){
        this.setState(state => ({isHistoryOpen: !state.isHistoryOpen}));
    }

    handleFavouriteClick(){
        this.setState(state => ({isFavouriteOpen: !state.isFavouriteOpen}));
    }

    handleAccountDetailClick(){
        this.setState(state => ({isAccountDetailOpen: !state.isAccountDetailOpen}));
    }

    handleHistoryClose(){
        this.setState({isHistoryOpen: false});
    }

    render(){
        return(
             <div>
                 <div><Button className="bg-blue-500 hover:bg-blue-700 text-blue-600 hover:text-red-600 font-bold py-2 px-4 rounded" 
                        onClick={this.handleClick}>Menu</Button></div>
                      
                       <div>{this.state.isOpen? 
                            <div className="bg-cover bg-center shadow overflow-hidden h-100 w-40"
                             style={{ backgroundColor: 'black', opacity: "0.8", position: 'absolute', left: "0rem", top: '5.5rem', height:'50rem', width: "20rem" }}>
                                              
                                <ul >
                                     <li >
                                        <a href= "#" className="block p-10 text-xl text-grey-darker text-white font-bold border-grey-lighter hover:border-purple-light hover:bg-grey-lighter border-r-4" 
                                            onClick={this.handleFavouriteClick} 
                                            style={{fontSize: "2.5rem", fontFamily: "alegreya", color: "white", textDecoration:  "none" }}>
                                            Favourites
                                        </a>

                                        <div>
                                            {this.state.isFavouriteOpen? <div><Favourites/></div> : null}
                                        </div>
                  
                                     </li>

                                     <li >
                                        <a href= "#" className="block p-10 text-xl text-grey-darker text-white font-bold border-grey-lighter hover:border-purple-light hover:bg-grey-lighter border-r-4" 
                                            onClick={this.handleHistoryClick}
                                            style={{fontSize: "2.5rem", fontFamily: "alegreya", color: "white", textDecoration:  "none" }}>
                                            History
                                        </a>

                                        <div>
                                            {this.state.isHistoryOpen? <div><History/> </div> : null}
                                        </div>
                  
                                     </li>

                                     <li >
                                        <a href= "#" className="block p-10 text-xl text-grey-darker text-white font-bold border-grey-lighter hover:border-purple-light hover:bg-grey-lighter border-r-4" 
                                            onClick={this.handleAccountDetailClick}
                                            style={{fontSize: "2.5rem", fontFamily: "alegreya", color: "white", textDecoration:  "none" }}>
                                            Account Detail
                                        </a>

                                        <div>
                                            {this.state.isAccountDetailOpen? <div> <AccountDetail/> </div> : null }
                                        </div>
                  
                                     </li>
                                   

                                    
                                    </ul>
                                </div>:
                                null}
                    </div>
            </div>   
        );
    }

}


