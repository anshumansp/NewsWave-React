import React, { Component } from "react";
import NewsItem from "./NewsItem";
import newsData from "./News.json";

const articlesObj = newsData;

class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: articlesObj.articles,
      loading: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 2);
      const twoDaysBackDate = currentDate.toISOString().split('T')[0];

      const category = "News"

      const response = await fetch(`https://newsapi.org/v2/everything?q=${category}&from=${twoDaysBackDate}&sortBy=popularity&apiKey=55701431df3b413882f4ba316e8e23b2`);
      if (response.ok) {
        const newData = await response.json();
        this.setState({ articles: newData.articles, loading: false });
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  render() {
    const first21Articles = this.state.articles.slice(0, 21);

    const articleComponents = first21Articles.map((article, index)=> (
      <NewsItem
        key={index}
        source={article.source.name}
        title={article.title}
        url={article.url}
        urlToImage={article.urlToImage}
        description={article.description}
        publishTime={article.publishedAt}
      />
    ));

    return (
      <div>
        <div className="bg-black flex justify-center items-center flex-col h-24 my-3 text-5xl text-center">
          <h1>Discover Latest News & Trends</h1>
        </div>
        <div className="flex flex-row items-stretch flex-wrap mx-8">
          {articleComponents}
        </div>
      </div>
    );
  }
}

export default News;
