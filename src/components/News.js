import React, { Component } from "react";
import NewsItem from "./NewsItem";
import newsData from "./News.json";

const articlesObj = newsData;

class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: articlesObj.articles,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.newCategory !== prevProps.newCategory) {
      const { newCategory } = this.props;
      if (newCategory.split(" ").filter(Boolean).length > 0) {
        this.fetchData(newCategory);
      }
    }
  }

  fetchData = async (newCategory) => {
    try {
      this.setState({ loading: true });
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 2);
      const twoDaysBackDate = currentDate.toISOString().split("T")[0];

      const category = newCategory || "Business";

      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${category}&from=${twoDaysBackDate}&sortBy=popularity&apiKey=da0cc711cac54ff98006cbe9478d0888`
      );
      if (response.ok) {
        const newData = await response.json();
        this.setState({ articles: newData.articles, loading: false });
      } else {
        console.error("Error fetching data");
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error:", error);
      this.setState({ loading: false });
    }
  };

  render() {
    const first21Articles = this.state.articles.slice(0, 21);
    const articleComponents = first21Articles.map((article, index) => (
      <NewsItem
        key={index}
        source={article.source.name}
        title={article.title}
        url={article.url}
        urlToImage={article.urlToImage}
        description={article.description}
        publishTime={new Date(article.publishedAt)}
      />
    ));

    return (
      <div>
        <div className="bg-black flex justify-center items-center flex-col h-20 my-3 text-5xl text-center">
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
