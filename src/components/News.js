import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

class News extends Component {
  static defaultProps = {
    pageSize : 18,
    country: "us",
    category: "general"
  }

  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    country: PropTypes.string,
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  // `apiKey1=55701431df3b413882f4ba316e8e23b2`
  // `apiKey2=da0cc711cac54ff98006cbe9478d0888`
  // `apiKey2=cb19d96dc54a4bd7b7192585cdec959d`

  fetchData = async () => {
    try {
      this.setState({ loading: true });
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cb19d96dc54a4bd7b7192585cdec959d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      const response = await fetch(url);
      if (response.ok) {
        const newData = await response.json();
        this.setState({
          articles: newData.articles,
          totalResults: newData.totalResults,
          loading: false,
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
    this.setState({ page: this.state.page - 1}, () => {
      this.fetchData();
    });
  };

  handleNextClick = () => {
    this.setState({ page: this.state.page + 1}, () => {
        this.fetchData();
    });
  };

  capitalizeIt = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  componentDidMount() {
    this.fetchData();
    if (this.props.category !== "general") {
      document.title = `NewsWave | ${this.capitalizeIt(this.props.category)} News`
    } else {
      document.title = "NewsWave - Discover Trending and Latest News"
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      const { category } = this.props;
      if (category.split(" ").filter(Boolean).length > 0) {
        this.fetchData();
      }
    }
  }

  render() {
    const articleComponents = this.state.articles.map((article, index) => {
      const { source, title, url, urlToImage, description, publishedAt } = article;
      return (
        <NewsItem
          key={index}
          source={source.name}
          title={title}
          url={url}
          urlToImage={urlToImage}
          description={description}
          publishTime={new Date(publishedAt)}
        />
      );
    });
    
    

    return (
      <div>
        <div className="bg-black flex justify-center items-center flex-col h-20 my-3 text-5xl text-center">
        {!this.state.loading && (
          (this.state.totalResults !== 0) ? (
            <h1 className="font-serif">Top {this.capitalizeIt(this.props.category)} Headlines</h1>
          ) : (
            <h2 className="mt-96">No News Available</h2>
          )
        )}



        </div>
        <div className="flex justify-center items-center">
          {this.state.loading && <Spinner/>}
        </div>
        <div className="flex flex-row items-stretch flex-wrap mx-8">
          {articleComponents}
        </div>



        {(this.state.totalResults !== 0) && 
        <div className="flex justify-between mx-14 my-8">
          <button
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            className={`inline-flex items-center bg-gray-800 border-0 py-3 px-4 focus:outline-none hover:bg-gray-500 rounded text-white mt-4 md:mt-0 
            ${
              this.state.page <= 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-500"
            }`}
          >
            &#8592; Previous
          </button>

          <button
            disabled={
              this.state.page >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextClick}
            className={`inline-flex items-center bg-gray-800 border-0 py-3 px-4 focus:outline-none hover:bg-gray-500 rounded text-white mt-4 md:mt-0
            ${
              this.state.page >
              Math.ceil(this.state.totalResults / this.props.pageSize)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-500"
            }`}
          >
            Next &#8594;
          </button>
        </div>
      }
      </div>
    );
  }
}

export default News;
