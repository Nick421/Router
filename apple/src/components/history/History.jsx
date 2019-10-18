import * as React from "react";
import { HistoryPopUp } from "./HistoryPopUp";

export default class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,

      maps: [
        {
          id: 1,
          name: "less long trip",
          start: "Sydney",
          end: "Melbourne",
          date: "13/10/2019"
        },
        {
          id: 2,
          name: "Very long trip",
          start: "Melbourne",
          end: "Sydney",
          date: "13/10/2019"
        },
        {
          id: 3,
          name: "the same trip?",
          start: "Sasdy",
          end: "Measdrne",
          date: "13/10/2019"
        }
      ]
    };
  }

  handleDelete = itemId => {
    const items = this.state.maps.filter(maps => maps.id !== itemId);
    this.setState({ maps: items });
  };


  render() {
    return (
      <div>
        <div>
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
             History{" "}
            </h1>
          
            {this.state.maps.map((trip, index) => (
              <HistoryPopUp
                key={index}
                 id={trip.id}
                 start={trip.start}
                 end={trip.end}
                 name={trip.name}
                 onDelete={this.handleDelete}
                 trip={trip}
              />
            ))}
          </div>
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
