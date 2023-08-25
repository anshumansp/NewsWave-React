import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import About from "./components/About";
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
      progress: 0
    }
  }

  setProgress = (progress) => {
    this.setState({ progress : progress})
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
    const newsProps = {
      setProgress: this.setProgress,
      pageSize: 9,
      country: "in",
    }
    return (
      <div>
       <BrowserRouter>
       <Navbar search={this.search} />
       <LoadingBar color='#22abba' progress={this.state.progress}/>
       <Routes>
        
       <Route exact path="/" element= { <News key="general" {...newsProps} category={this.state.category || "general"}/> }></Route>
       <Route exact path="/business" element={<News key="business" {...newsProps} category={this.state.category || "business"}/>}> </Route>
       <Route exact path="/technology" element={<News key="technology" {...newsProps} category={this.state.category || "technology"}/>}> </Route>
       <Route exact path="/science" element={<News key="science" {...newsProps} category={this.state.category || "science"}/>}> </Route>
       <Route exact path="/health" element={<News key="health" {...newsProps} category={this.state.category || "health"}/>}> </Route>
       <Route exact path="/sports" element={<News key="sports" {...newsProps} category={this.state.category || "sports"}/>}> </Route>
       <Route exact path="/entertainment" element={<News key="entertainment" {...newsProps} category={this.state.category || "entertainment"}/>}> </Route>
       <Route exact path="/about" element= {<About/>}> </Route>

       </Routes>
        </BrowserRouter>
      </div>
    );
  }
}