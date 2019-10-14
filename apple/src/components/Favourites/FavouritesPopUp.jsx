import React from "react";
import { Card, Overlay } from "@blueprintjs/core";


export class FavouritesPopUp extends React.Component {
  
  constructor(props){
    super (props);
    
    this.state={
      isCardOpen: false,
    }

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick(){
    this.setState(state => ({isCardOpen: !state.isCardOpen}))
  }

  
  render() {
    return (
      <div>
        
      {/* this is probably text box around the route name */}
      <div className="max-w-sm w-full lg:max-w-full lg:flex bg-grey-500"> 
        {/* button for card popup. When clicked, it should open a card as overlay  see if i can combine above and this*/}
        <div className="text-black w-full bg-gray-500 h-12">
          <button  className="text-xl text-center py-2 w-50 h-50" onClick={this.handleCardClick}>
            {" "}
            {this.props.name}
          </button>
        </div>

        <button
          onClick={() => this.props.onDelete(this.props.id)}
          className="bg-red-500 hover:bg-red-700 text-white h-50 w-20 font-bold rounded focus:outline-none focus:shadow-outline"
        >
          {" "}
          Delete
        </button>

      </div>
      
      <div>
          {this.state.isCardOpen ?
          <div>
            <Overlay onClose={this.handleCardClick} usePoral={true} isOpen={true} hasBackDrop={this.handleCardClick}>
                <Card className="bg-cover bg-center shadow overflow-hidden h-100 w-40 text-center item-center"
                  style={{
                  backgroundColor: "black",
                  position: "absolute",
                    left: "25%",
                    top: "10rem",
                    height: "25rem",
                    width: "50rem",
                    borderColor: "black",
                    borderWidth: "0.1rem",
                    opacity: "0.9"
                  }}
                >
                
                  <h1 className="block p-4 text-xl text-grey-darker text-center font-bold border-purple hover:bg-grey-lighter "
                        style={{
                          fontSize: "2.5rem",
                          fontFamily: "alegreya",
                          color: "white",
                          textDecoration: "none"
                        }}>
                        {" "}
                        {this.props.name}
                    </h1>
                    <div className="p-4">
                      <p className="block p-3 text-lg text-grey-darker text-center font-bold border-purple hover:bg-grey-lighter "
                          style={{
                            fontSize: "1.5rem",
                            fontFamily: "alegreya",
                            color: "white",
                            textDecoration: "none"
                          }}>
                              {" "}
                            Start: {this.props.start}
                      </p>

                      <p className="block p-3 text-lg text-grey-darker text-center font-bold border-purple hover:bg-grey-lighter"
                          style={{
                            fontSize: "1.5rem",
                            fontFamily: "alegreya",
                            color: "white",
                            textDecoration: "none"
                          }}>

                        {" "}
                        End: {this.props.end} 
                      </p>
                    </div>
                    
                    <div className="p-4">
                      <button className="bg-blue-500 p-4 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                          {" "}
                          Show Route
                      </button>
                    </div>

                      <div className="p-4">
                        <button className="bg-red-500 p-6 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={this.handleCardClick}>
                            {" "}
                            Close
                        </button>
                      </div>
                 </Card>
               </Overlay>
            </div>
              :
              null
            }
        </div>
        

      </div>
    );
  }

}
