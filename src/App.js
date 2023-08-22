import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import About from "./components/About";

export default class App extends Component {
  componentDidMount() {
    this.changeStyle();
  }

  changeStyle = () => {
    document.body.classList.add("text-gray-400", "bg-black", "body-font");
  };

  render() {
    return (
      <div>
        <Navbar />
        <News />
        <About />
      </div>
    );
  }
}
