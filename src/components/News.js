import React, { Component } from "react";
import NewsItem from "./NewsItem";

class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  fetchData = async (newCategory) => {
    try {
      this.setState({ loading: true });
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 2);
      const twoDaysBackDate = currentDate.toISOString().split("T")[0];
      const category = newCategory || "Business";
      const url = `https://newsapi.org/v2/everything?q=${category}&from=${twoDaysBackDate}&sortBy=popularity&apiKey=55701431df3b413882f4ba316e8e23b2&page=${this.state.page}`;
      const response = await fetch(url);

      // `apiKey1=55701431df3b413882f4ba316e8e23b2`
      // `apiKey2=da0cc711cac54ff98006cbe9478d0888`
      // `apiKey2=cb19d96dc54a4bd7b7192585cdec959d`

      if (response.ok) {
        const newData = await response.json();
        this.setState({
          articles: newData.articles,
          loading: false,
          totalResults: newData.totalResults,
        });
      } else {
        console.error("Error fetching data");
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error:", error);
      this.setState({ loading: false });
    }
  };

  handlePrevClick = () => {
    this.setState({ page: this.state.page - 1 }, () => {
      console.log("prev")
      this.fetchData();
    });
  };

  handleNextClick = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      if (this.state.page > Math.ceil(this.state.totalResults / 18)) {
        console.log("No More Results Found");
      } else {
        this.fetchData();
      }
    });
  };

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

  render() {
    const first21Articles = this.state.articles.slice(0, 18);
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

        <div className="flex justify-between mx-14 my-8">
          <button
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            className={`inline-flex items-center bg-gray-800 border-0 py-3 px-4 focus:outline-none hover:bg-gray-500 rounded text-white mt-4 md:mt-0 
            ${this.state.page <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-500'} rounded text-white mt-4 md:mt-0`}
          >
            &#8592; Previous
          </button>

          <button
            disabled={this.state.page > Math.ceil(this.state.totalResults/18)}
            onClick={this.handleNextClick}
            className={`inline-flex items-center bg-gray-800 border-0 py-3 px-4 focus:outline-none hover:bg-gray-500 rounded text-white mt-4 md:mt-0
            ${this.state.page > Math.ceil(this.state.totalResults/18)? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-500'} `}
          >
            Next &#8594;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
