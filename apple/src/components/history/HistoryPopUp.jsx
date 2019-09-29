import React from "react";

export class HistoryPopUp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div class="max-w-sm w-full lg:max-w-full lg:flex bg-grey-500">
          <div class="h-48 lg:h-auto lg:w-20 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            <button className="bg-blue-500 hover:bg-blue-700 text-white h-full w-full  font-bold rounded focus:outline-none focus:shadow-outline">
              {" "}
              Use
            </button>
          </div>
          <button
            onClick={() => this.props.onDelete(this.props.id)}
            className="bg-red-500 hover:bg-red-700 text-white h-50 w-20 font-bold rounded focus:outline-none focus:shadow-outline"
          >
            {" "}
            Delete
          </button>
          <div className="text-black w-full bg-gray-500 h-12">
            <h1 className="text-xl text-center py-2">
              {" "}
              {this.props.name}: from {this.props.start} TO {this.props.end}{" "}
            </h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
