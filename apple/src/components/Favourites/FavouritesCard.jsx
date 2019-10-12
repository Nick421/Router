import React from "react";

import { Card, Overlay, Classes, Button } from "@blueprintjs/core";

export class FavouriteCard extends React.Component {

    constructor(props){
      super(props)

      this.state={
        isOpen:false,
        isCardOpen: false,
      }

      // this.handleCardClick = this.handleCardClick.bind(this);
    }
    handleCardClick(){
      this.setState(state => ({isCardOpen: !state.isCardOpen}));
    }
    
    handleClose(){
      this.setState(state => ({isOpen:true}));
    }

    render() {
      return (
        <div>
       {/* <Overlay isOpen={true} onClose={this.handleClose} className={Classes.OVERLAY_SCROLL_CONTAINER}{... this.state} > */}
          <Overlay isOpen={true}>  
            <Card className = "absolute mt-40" >
              <p> HI</p>
            </Card>
         </Overlay>
         </div>
      );
    }
  }


 