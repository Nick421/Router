import React from "react";
import { Classes, Overlay, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import * as FavouriteServices from "../../services/favourite/favourite";
import Loading from "../base/loading/Loading";

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
    this.setState({ isLoading: true });
    await this.loadFavourites();
    console.log(this.state.favouriteList);
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
        { this.state.isLoading ? <Loading/> : this.renderTable() }
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
    const renderFavourites = this.state.favouriteList.map((item) => (
      <tr key={item[1][0]}>
        <td className="truncate">{item[1][1]}</td>
        <td className="truncate">{item[1][2]}</td>
        <td className="truncate">{item[1][3]}</td>
        <td className="flex flex-row w-12 mr-4">
          <Button 
            icon={IconNames.CROSS}
            intent={Intent.DANGER}
          />
        </td>
      </tr>
    ));
    return renderFavourites;
  }

  loadFavourites = async () => {
    const favouriteList = await FavouriteServices.getAllFavourites();
    this.setState({
      favouriteList,
      isLoading: false,
    });
  }
}
