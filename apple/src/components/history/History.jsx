import React from "react";
import { Classes, Overlay, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import * as FavouriteServices from "../../services/favourite/favourite";
import * as HistoryServices from "../../services/history/history";

export default class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      historyList: [],
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
        <p className="text-3xl text-bold text-orange-600 pb-8">History</p>
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
    const renderHistory = this.state.historyList.map((item) => (
      <tr key={item.historyID}>
        <td className="truncate">{item.source}</td>
        <td className="truncate">{item.destination}</td>
        <td className="truncate">{item.keyword}</td>
        <td className="truncate">{item.date}</td>
        <td className="flex flex-row w-12 mr-4">
          <Button 
            className="mx-2"
            disabled={ item.favourite ? true : false }
            icon={IconNames.STAR_EMPTY}
            intent={Intent.SUCCESS}
            onClick={() => this.saveFavourite(item.historyID)}
          />
          <Button 
            icon={IconNames.CROSS}
            intent={Intent.DANGER}
            onClick={() => this.deleteHistory(item.historyID)}
          />
        </td>
      </tr>
    ));
    return renderHistory;
  }

  updateList = async () => {
    this.setState({ isLoading: true });
    await this.loadHistory();
  }

  loadHistory = async () => {
    const historyList = (await HistoryServices.getAllHistory()) || [];
    this.setState({
      historyList: historyList.sort((a, b) => { return b.historyID - a.historyID; }),
      isLoading: false,
    });
    return;
  }

  saveFavourite = async (historyID) => {
    await FavouriteServices.saveFavourite({historyID: historyID});
    await this.updateList();
  }

  deleteHistory = async (historyID) => {
    await HistoryServices.deleteHistory({data: {historyID: historyID}});
    await this.updateList();
  }
}
