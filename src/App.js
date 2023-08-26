import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import About from "./components/About";
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  const [category, setCategory] = useState("")
  const [progress, setProgress] = useState(0)

  const setTheProgress = (progress) => {
    setProgress(progress)
  }

  const changeStyle = () => {
    document.body.classList.add("text-gray-400", "bg-black", "body-font");
  };

  useEffect(()=> {
    changeStyle();
  }, [])

  const search = () => {
    const searchBar = document.getElementById("searchBar");
    let category = searchBar.value;
    searchBar.value = "";
    setCategory(category)
  }

  const newsProps = {
    setProgress: setTheProgress,
    pageSize: 15,
    country: "in",
    apiKey : process.env.REACT_APP_API_KEY
  }

    return (
      <div>
       <BrowserRouter>
       <Navbar search={search}/>
       <LoadingBar color='#22abba' progress={progress}/>
       <Routes>
        
       <Route exact path="/" element= { <News key="general" {...newsProps} newCategory={category} category={"general"}/> }></Route>
       <Route exact path="/business" element={<News key="business" {...newsProps} newCategory={category} category={"business"}/>}> </Route>
       <Route exact path="/technology" element={<News key="technology" {...newsProps} newCategory={category} category={"technology"}/>}> </Route>
       <Route exact path="/science" element={<News key="science" {...newsProps} newCategory={category} category={"science"}/>}> </Route>
       <Route exact path="/health" element={<News key="health" {...newsProps} newCategory={category} category={"health"}/>}> </Route>
       <Route exact path="/sports" element={<News key="sports" {...newsProps} newCategory={category} category={"sports"}/>}> </Route>
       <Route exact path="/entertainment" element={<News key="entertainment" {...newsProps} newCategory={category} category={"entertainment"}/>}> </Route>
       <Route exact path="/about" element= {<About/>}> </Route>

       </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App;