import * as React from "react";

import { Button } from "@blueprintjs/core";
import BaseLayout from "./../base/BaseLayout";
import { FavouritesPopUp } from "./FavouritesPopUp";

export default class Favourites extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      isOpen: false,

      maps: [
        {
          id: 1,
          name: "Gym trip",
          start: "West Ryde",
          end: "Redfern",
          date: "13/10/2019"
        },
        {
          id: 2,
          name: "Food trip",
          start: "Townhall",
          end: "Paramatta",
          date: "14/10/2019"
        },
        {
          id: 3,
          name: "Scenic trip",
          start: "Sydney",
          end: "Woolongong",
          date: "05/10/2019"
        },
        {
            id: 4,
            name: "Burgers",
            start: "Blacktown",
            end: "Mascot",
            date: "04/10/2019"
        },
        {
            id: 5,
            name: "Coffee break",
            start: "Wynyard",
            end: "Darling Harbourt",
            date: "01/10/2019"
          }
      ]
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleDelete = itemId => {
    const items = this.state.maps.filter(maps => maps.id !== itemId);
    this.setState({ maps: items });
  };

  handleClick() {
    this.setState(state => ({ isOpen: !state.isOpen }));
    // dont forget to fix the state variables
  }

  render() {
    return (
      <div>

        <div>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-blue-600 hover:text-red-600 font-bold py-2 px-4 rounded"
            onClick={this.handleClick}
          >
            Favourites
          </Button>
        </div>

        <div>
          {this.state.isOpen ? (
            <div
              className="bg-cover bg-center shadow overflow-hidden h-100 w-40 text-center item-center"
              style={{
                backgroundColor: "white",
                position: "fixed",
                left: "25%",
                top: "5.5rem",
                height: "50rem",
                width: "50%",
                borderColor: "black",
                borderWidth: "0.1rem",
                opacity: "0.9"
              }}
            >
              <h1
                className="block p-10 text-xl text-grey-darker text-center font-bold border-purple hover:bg-grey-lighter border-r-4"
                style={{
                  fontSize: "2.5rem",
                  fontFamily: "alegreya",
                  color: "black",
                  textDecoration: "none"
                }}
              >
                {" "}
                Favourites{" "}
              </h1>
              {this.state.maps.map(trip => (
                <FavouritesPopUp
                  id={trip.id}
                  start={trip.start}
                  end={trip.end}
                  name={trip.name}
                  onDelete={this.handleDelete}
                  trip={trip}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  returnName(trip) {
    return trip.name;
  }

  renderCollectionList() {
    var testdata = this.createTestData();
    testdata.maps.map(trip => <li>{trip.name}</li>);
  }
}
