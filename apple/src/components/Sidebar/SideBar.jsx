import * as React from "react";

import{ Nav, Button,Drawer, Classes, Menu, MenuItem} from "@blueprintjs/core";
import BaseLayout from "./../base/BaseLayout";
import Favourites from "./../Favourites/Favourites";

export default class SideBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {isOpen: false};
        // this.favState = {isFavouriteOpen: false};

        this.handleClick = this.handleClick.bind(this);
        // this.favouriteHandleClick = this.favouriteHandleClick.bind(this);
    }

    handleClick(){
        this.setState(state => ({isOpen: !state.isOpen}));
    }

    // favouriteHandleClick(){
    //     this.setState(favState => ({isFavouriteOpen : !favState.isFavouriteOpen}));
    // }

    render(){
        return(
             <div>
                 <div><Button className="bg-blue-500 hover:bg-blue-700 text-blue-600 hover:text-red-600 font-bold py-2 px-4 rounded" onClick={this.handleClick}>Menu</Button></div>
                       <div>{this.state.isOpen? 
                            <div className="bg-cover bg-center shadow overflow-hidden h-100 w-40" style={{ backgroundColor: 'black', opacity: "0.7", position: 'absolute', left: "0rem", top: '5.5rem', height:'50rem', width: "20rem" }}>
                                <ul className="list-reset">
                                     <li >
                                        <a href = "#" className="block p-10 text-xl text-grey-darker text-white font-bold border-purple hover:bg-grey-lighter border-r-4" 
                                        style={{fontSize: "2.5rem",  fontFamily: "alegreya",color: "white", textDecoration: 
                                            "none"}}>Home</a>
                                     </li>
                                     <li >
                                        <a href= "#" className="block p-10 text-xl text-grey-darker text-white font-bold border-grey-lighter hover:border-purple-light hover:bg-grey-lighter border-r-4" 
                                            onClick={this.favouriteHandleClick}
                                            style={{fontSize: "2.5rem", fontFamily: "alegreya", color: "white", textDecoration: 
                                            "none"}}>Favourites</a>
                                                                 
                                     </li>
                                     <li >
                                     <a href="#" className="block p-10 text-xl text-grey-darker text-white font-bold border-grey-lighter hover:border-purple-light hover:bg-grey-lighter border-r-4" 
                                     style={{fontSize: "2.5rem", fontFamily: "alegreya",color: "white", textDecoration: 
                                            "none"}}>Bookmark</a>
                                     </li>
                                    <li >
                                        <a href="#" className="block p-10 text-xl text-grey-darker text-white font-bold border-grey-lighter hover:border-purple-light hover:bg-grey-lighter border-r-4" 
                                        style={{fontSize: "2.5rem", fontFamily: "alegreya", color: "white", textDecoration: 
                                            "none"}}>Account Detail</a>
                                    </li>
                                    </ul>
                                </div>:
                                null}
                    </div>
            </div>   
        );
    }

}