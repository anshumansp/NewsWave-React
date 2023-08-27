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
      progress: 0,
      country: "in"
    }
  }

  setProgress = (progress) => {
    this.setState({ progress : progress})
  }

  
  componentDidMount() {
    this.changeStyle();
  }

  handleCountryChange = (country) => {
   this.setState({ country: country });
  }

  changeStyle = () => {
    document.body.classList.add("text-gray-400", "bg-black", "body-font");
  };

  render() {
    const newsProps = {
      setProgress: this.setProgress,
      pageSize: 15,
      country: this.state.country,
      apiKey : process.env.REACT_APP_API_KEY
    }

    return (
      <div>
       <BrowserRouter>
       <Navbar search={this.search} country={this.handleCountryChange}/>
       <LoadingBar color='#22abba' progress={this.state.progress}/>
       <Routes>
        
       <Route exact path="/" element= { <News key="general" {...newsProps} category={"general"}/> }></Route>
       <Route exact path="/business" element={<News key="business" {...newsProps} category={"business"}/>}> </Route>
       <Route exact path="/technology" element={<News key="technology" {...newsProps} category={"technology"}/>}> </Route>
       <Route exact path="/science" element={<News key="science" {...newsProps} category={"science"}/>}> </Route>
       <Route exact path="/health" element={<News key="health" {...newsProps} category={"health"}/>}> </Route>
       <Route exact path="/sports" element={<News key="sports" {...newsProps} category={"sports"}/>}> </Route>
       <Route exact path="/entertainment" element={<News key="entertainment" {...newsProps} category={"entertainment"}/>}> </Route>
       <Route exact path="/about" element= {<About/>}> </Route>

       </Routes>
        </BrowserRouter>
      </div>
    );
  }
}