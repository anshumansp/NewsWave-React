import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import About from "./components/About";

export default class App extends Component {
  render() {
    const componentDidMount = () => {
      document.body.classList.add("text-gray-400", "bg-black", "body-font");
    };

    const func = async () => {
      const jsonData = await fetch(
        "https://newsapi.org/v2/everything?q=Apple&from=2023-08-01&sortBy=popularity&apiKey=55701431df3b413882f4ba316e8e23b2"
      );
      const data = await jsonData.json();
      const articles = data.articles;
      return articles;
    };
    componentDidMount();
    return (
      <div>
        <Navbar />
        <News article={func} />
        <About />
      </div>
    );
  }
}
