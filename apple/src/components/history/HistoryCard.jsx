import React from "react";
import { Card, Overlay } from "@blueprintjs/core";

export class HistoryCards extends React.Component {
  
  constructor(props){
    super (props);
    this.state={
      isCardOpen: false,
    }
    this.handleCardClick = this.handleCardClick.bind(this);
  }
  
  render() {
    return (
      null
    );
  }

  handleCardClick(){
    this.setState(state => ({isCardOpen: !state.isCardOpen}))
  }

}
