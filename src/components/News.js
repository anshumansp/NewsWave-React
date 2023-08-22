import React, { Component } from "react";
import NewsItem from "./NewsItem";
import newsData from "./News.json"

const articlesObj = newsData;

export class News extends Component {
  constructor() {
    super();
    console.log("This is the constructor of News Component");
    this.state = {
      articles: articlesObj.articles,
      loading: false
    }
  }
  

  render() {
    const articleComponents = this.state.articles.map((article, index) => (
      <NewsItem
        key={index}
        author={article.source.name}
        title={article.title}
        url={article.url}
        urlToImage={article.urlToImage}
        description={article.description}
      />
    ));

    return (
      <div>
        <div className="bg-black flex justify-center items-center flex-col h-24 my-3 text-5xl text-center">
          <h1>Discover Latest News & Trends</h1>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-12 justify-center"> */}
          <div class="flex flex-row items-stretch flex-wrap mx-8">
          {articleComponents}
        </div>
      </div>
    );
  }
}

export default News;
