import React from "react";
import { Classes, Overlay, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

const maps = [
  {
    id: 1,
    keyword: "less long trip",
    start: "Sydney",
    end: "Melbourne",
    date: "13/10/2019"
  },
  {
    id: 2,
    keyword: "Very long trip",
    start: "Melbourne",
    end: "Sydney",
    date: "13/10/2019"
  },
  {
    id: 3,
    keyword: "the same trip?",
    start: "Sasdy",
    end: "Measdrne",
    date: "13/10/2019"
  }
];

export default class Favourites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <Overlay
        className={`${Classes.OVERLAY_SCROLL_CONTAINER} flex h-screen absolute items-center justify-center`}
        canEscapeKeyClose={true}
        canOutsideClickClose={false}
        isOpen={this.props.isOpen}
        onClose={this.props.closeHandler}
        transitionName={Classes.OVERLAY_SCROLL_CONTAINER}
      >
        {this.renderTable()}
      </Overlay>
    );
  }

  renderTable = () => {
    return (
      <div className="flex flex-col bg-white text-center md:w-1/2 sm:w-64 justify-center items-center px-8 pt-8 pb-16">
        <div className="px-2 py-2 right-0 top-0 absolute">
          <Button
              className="focus:outline-none"
              icon={IconNames.CROSS}
              minimal={true}
              onClick={this.props.closeHandler}
          />
        </div>
        <p className="text-3xl text-bold text-orange-600 pb-8">Favourites</p>
        <table className="bp3-html-table .modifier w-full">
          <thead>
            <tr>
              <th>Origin</th>
              <th>Destination</th>
              <th>Keywords</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableBody()}
          </tbody>
        </table>
      </div>
    )
  }

  renderTableBody = () => {
    const renderHistory = maps.map((value) => (
      <tr key={value.id}>
        <td className="truncate">
          {value.start}
        </td>
        <td className="truncate">{value.end}</td>
        <td className="truncate">{value.date}</td>
        <td className="flex flex-row w-12">
          <Button 
            className="mx-3"
            icon={IconNames.STAR_EMPTY}
            intent={Intent.SUCCESS}
          />
          <Button 
            icon={IconNames.CROSS}
            intent={Intent.DANGER}
          />
        </td>
      </tr>
    ));

    return renderHistory;
  }
}
