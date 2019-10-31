import React from "react";
import { Classes, Overlay, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import * as HistoryServices from "../../services/history/history";
import * as FavouriteServices from "../../services/favourite/favourite";

export default class Favourites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favouriteList: [],
      isOpen: false,
      isLoading: false,
    };
  }

  async componentDidMount() {
    await this.updateList();
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
        { this.renderTable() }
      </Overlay>
    );
  }

  renderTable = () => {
    return (
      <div className="flex flex-col bg-white text-center w-96 justify-center items-center px-8 pt-8 pb-16">
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
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          { this.state.isLoading ? null : this.renderTableBody() }
        </tbody>
      </table>
      </div>
    )
  }

  renderTableBody = () => {
    const renderFavourites = this.state.favouriteList.map((item) => (
      <tr key={item.historyID}>
        <td className="truncate">{item.source}</td>
        <td className="truncate">{item.destination}</td>
        <td className="truncate">{item.keyword}</td>
        <td className="truncate">{item.date}</td>
        <td className="flex flex-row w-12 mr-4">
          <Button 
            icon={IconNames.CROSS}
            intent={Intent.DANGER}
            onClick={() => this.removeFavourite(item.historyID)}
          />
        </td>
      </tr>
    ));
    return renderFavourites;
  }

  updateList = async () => {
    this.setState({ isLoading: true });
    await this.loadFavourites();
  }

  loadFavourites = async () => {
    const historyList = (await HistoryServices.getAllHistory()) || [];
    const favouriteList = [];
    /** Save only favourite object that has a favourite flag */
    historyList.forEach((item) => {
      if (item.favourite) {
        favouriteList.push(item);
      }
    });

    /** Sort to show the most recent ID first */
    this.setState({
      favouriteList: favouriteList.sort((a, b) => { return b.historyID - a.historyID; }),
      isLoading: false,
    });
  } 

  removeFavourite = async (historyID) => {
    await FavouriteServices.deleteFavourite({data: {historyID: historyID}});
    await this.updateList();
  }
}
