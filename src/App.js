import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
// import About from "./components/About";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      category: ""
    }
  }

  componentDidMount() {
    this.changeStyle();
  }

  search = () => {
    const searchBar = document.getElementById("searchBar");
    let category = searchBar.value;
    searchBar.value = "";
    this.setState({category: category})
  }

  changeStyle = () => {
    document.body.classList.add("text-gray-400", "bg-black", "body-font");
  };

  render() {
    return (
      <div>
        <Navbar search={this.search}/>
        <News newCategory={this.state.category}/>
        {/* <About /> */}
      </div>
    );
  }
}
