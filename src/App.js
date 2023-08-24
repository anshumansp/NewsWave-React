import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import About from "./components/About";
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

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
    const pageSize = 18;
    const country = "in"
    return (
      <div>
       <BrowserRouter>
       <Navbar search={this.search} />
       <Routes>
        
       <Route exact path="/" element= { <News key="general" pageSize={pageSize} country={country} category={this.state.category || "general"}/> }></Route>
       <Route exact path="/business" element={<News key="business" pageSize={pageSize} country={country} category={this.state.category || "business"}/>}> </Route>
       <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} country={country} category={this.state.category || "technology"}/>}> </Route>
       <Route exact path="/science" element={<News key="science" pageSize={pageSize} country={country} category={this.state.category || "science"}/>}> </Route>
       <Route exact path="/health" element={<News key="health" pageSize={pageSize} country={country} category={this.state.category || "health"}/>}> </Route>
       <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} country={country} category={this.state.category || "sports"}/>}> </Route>
       <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} country={country} category={this.state.category || "entertainment"}/>}> </Route>
       <Route exact path="/about" element= {<About/>}> </Route>

       </Routes>
        </BrowserRouter>
      </div>
    );
  }
}