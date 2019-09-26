import React from "react";
import { withRouter } from "react-router-dom";
import { Button, IconName } from "@blueprintjs/core";

const bgImg = require("./images/city-span-down.jpg");
const xbox = require("./images/xbox.png");
const city = require("./images/city-across.jpg");
const rail = require("./images/rail.jpg");

function demoAsyncCall() {
  return new Promise(resolve => setTimeout(() => resolve(), 2500));
}

class Home extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  redirectHandler = () => {
    console.log("redir");
    this.props.history.push("/map");
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return null;
    }
    return (
        // Front page
      <div>
        <div className="h-full overflow-x-hidden">
          <section className="flex flex-col items-center justify-center h-screen">
            <div
              className="flex flex-col text-white bg-center items-center justify-center bg-cover bg-fixed w-screen h-full"
              style={{ backgroundImage: `url(${bgImg})` }}
            >
              <div className="flex flex-col items-center">
                <h1 className=" text-6xl mr ">ROUTER</h1>
                <p className="mt-2">
                  {" "}
                  Focus on the journey and not the destination{" "}
                </p>
              </div>
              <div className="w-1/4 h-2 bg-white border-round"></div>
              <button
                className="mt-16 h-20 flex justify-center items-center w-48 border-orange-400 hover:border-teal-400 hover:text-teal-400 focus:outline-none border-4 border-solid rounded-lg text-orange-400 text-2xl select-none"
                onClick={this.redirectHandler}
              >
                Login
              </button>
            </div>
          </section>
        </div>
        {/* Explanation page*/}

        <section
          className="flex flex-col items-center justify-center bg-center h-screen bg-cover bg-fixed h-full"
          style={{ backgroundImage: `url(${rail})` }}
        >
          ><h1 className="text-6xl text-orange-400">The problem</h1>
          <h2 className="text-white text-2xl">
            {" "}
            Have you and a friend ever not been able to decide where to eat when
            going out?{" "}
          </h2>
          <h2 className="text-white text-2xl">
            Or on a long road trip just want to know the closest place to get
            fuel?
          </h2>
          <h2 className="text-white text-2xl">
            Or even need a bar crawl planned entirely for you?
          </h2>
          <h2 className="text-white text-2xl h-1/2">
            In modern society we often have TOO MUCH choice
          </h2>
          <h2 className="text-white text-3xl">
            Router a tool built with Google Maps, allowing you to do all these
            things and more{" "}
          </h2>
          <h2 className="text-6xl text-orange-400">
            {" "}
            Router helps navigate the chaos of choice
          </h2>
       
        </section>
        {/* Features page*/}
        <section
          className="flex flex-col items-center justify-center bg-center h-screen bg-cover bg-fixed h-full"
          style={{ backgroundImage: `url(${city})` }}
        >
          ><h1 className="text-6xl text-orange-400 py-1">Features</h1>
          <div className="flex mb-4">
            <div className="w-full bg-gray-500 h-15">
              <div className="flex -mx-2">
                <div className="w-1/3 px-40 py-6">
                  <div className="font-bold text-xl mb-2">
                    1. Find new local attractions
                  </div>
                  <img src={xbox} alt="Local Atrractions"></img>
                </div>

                <div className="w-1/3 px-40 py-6">
                  <div className="font-bold text-xl mb-2 justify-center">
                    2. Travel in exciting new ways
                  </div>
                  <img src={xbox} alt="Blacklist"></img>
                </div>

                <div className="w-1/3 px-40 py-6">
                  <div className="font-bold text-xl mb-2">
                    3. Personalise for you
                  </div>
                  <img src={xbox} alt="personalise"></img>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }
}
export default withRouter(Home);
