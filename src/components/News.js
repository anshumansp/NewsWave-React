import React, { Component } from "react";
import NewsItem from "./NewsItem";


export class News extends Component {
   render() {
    return (
      <div>
        <div className="bg-black flex justify-center items-center flex-col h-24 m-4 text-5xl text-center">
          <h1>Discover Latest News & Trends</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 justify-center">
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
        </div>
      </div>
    );
  }
}

export default News;
