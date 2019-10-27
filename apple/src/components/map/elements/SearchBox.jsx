import React from 'react';
import { Button, Colors, InputGroup, Intent } from "@blueprintjs/core";

export default class SearchBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      source: "",
      destination: "",
      keyword: ""
    }
  }

  render() {
    return (
      <div
        className="flex w-screen absolute items-start pt-1 px-4 h-12 justify-center z-10"
        style={{ backgroundColor: Colors.DARK_GRAY1, top: "3.15rem" }}
      >
        <div className="flex flex-row">
          <InputGroup
            className="mx-2 w-56"
            placeholder="Source..."
            onChange={this.props.sourceChangeHandler}
            value={this.props.source}
            disabled={this.props.disabled}
          />
          <InputGroup
            className="mx-2 w-56"
            placeholder="Destination..."
            onChange={this.props.destinationChangeHandler}
            value={this.props.destination}
            disabled={this.props.disabled}
          />
          <InputGroup
            className="mx-2 w-56"
            placeholder="Keyword..."
            onChange={this.props.keywordChangeHandler}
            value={this.props.keyword}
            disabled={this.props.disabled}
          />
          <Button
            className="mx-2"
            text="Search"
            intent={Intent.WARNING}
            onClick={this.props.searchHandler}
            disabled={this.props.disabled}
          />
        </div>
      </div>
    )
  }
}