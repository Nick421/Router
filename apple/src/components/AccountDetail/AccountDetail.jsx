import * as React from "react";

export default class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,

    };
  }


  render() {
    return (
      <div>
        <div>
          <div
              className="bg-cover bg-center shadow overflow-hidden h-100 w-40 text-center item-center"
                      style={{
                backgroundColor: "white",
                position: "fixed",
                left: "30%",
                top: "6.5rem",
                height: "30rem",
                width: "40%",
                borderColor: "black",
                borderWidth: "0.1rem",
                opacity: "1"
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
              Account Detail{" "}
            </h1>
              
            <h2
              className="block p-10 text-xl text-grey-darker text-left font-bold border-purple hover:bg-grey-lighter border-r-4"
              style={{
                fontSize: "1.4rem",
                  fontFamily: "helvetica",
                  color: "black",
                  textDecoration: "none",
                  padding: "1rem"
              }}
            >
              {" "}
              Name: John Doe{" "}
            </h2>

            <h2
              className="block p-10 text-xl text-grey-darker text-left font-bold border-purple hover:bg-grey-lighter border-r-4"
              style={{
                fontSize: "1.4rem",
                fontFamily: "alegreya",
                color: "black",
                textDecoration: "none",
                padding: "1rem"
              }}
            >
              {" "}
              Number of Trips made: 92{" "}
            </h2>

            <h2
              className="block p-10 text-xl text-grey-darker text-left font-bold border-purple hover:bg-grey-lighter border-r-4"
              style={{
                fontSize: "1.4rem",
                fontFamily: "alegreya",
                color: "black",
                textDecoration: "none",
                padding: "1rem"
              }}
            >
              {" "}
              Number of Favourite routes: 15{" "}
            </h2>

            <h2
              className="block p-10 text-xl text-grey-darker text-left font-bold border-purple hover:bg-grey-lighter border-r-4"
              style={{
                fontSize: "1.4rem",
                fontFamily: "alegreya",
                 color: "black",
                 textDecoration: "none",
                 padding: "1rem"
              }}
            >
              {" "}
              Gmail account: blahblahblah@gmail.com{" "}
            </h2> 
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
