import React from "react"
import { withRouter } from "react-router-dom"
import { Button, IconName } from "@blueprintjs/core"

const bgImg = require("./images/city-span-down.jpg")

function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
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
    }

    render() {
        const { loading } = this.state;
        if(loading) {
            return null;
        }
        return (
            <div className="h-full overflow-x-hidden">
                <section className="flex flex-col items-center justify-center h-screen">
                    <div className="flex flex-col text-white bg-center items-center justify-center bg-cover bg-fixed w-screen h-full" 
                    style={{ backgroundImage: `url(${bgImg})`, }}>
                        <div className="flex flex-col items-center w-1/4">
                            <h1 className=" text-6xl mr-48 ">Tangerine</h1>
                            <p className="mt-2">The tangerine is a group of orange-colored citrus fruit consisting of hybrids of mandarin orange (Citrus reticulata)</p>
                        </div>
                        <div className="w-1/4 h-2 bg-white border-round">
                        </div>
                        <button 
                            className="mt-16 h-20 flex justify-center items-center w-48 border-orange-400 hover:border-teal-400 hover:text-teal-400 focus:outline-none border-4 border-solid rounded-lg text-orange-400 text-2xl select-none"
                            onClick={this.redirectHandler}
                        >
                            Getting started
                        </button>
                    </div>
                    
                </section>
                <section className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-6xl text-orange-400">ORANGE</h1>
                </section>
            </div>
        )
    }
}
export default withRouter(Home);