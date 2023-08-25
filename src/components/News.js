import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

class News extends Component {
  static defaultProps = {
    pageSize: 18,
    country: "us",
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    this.debounceTimeout = null;
  }

  // API Keys{
  //   // `apiKey1=55701431df3b413882f4ba316e8e23b2`
  //   // `apiKey2=da0cc711cac54ff98006cbe9478d0888`
  //   // `apiKey2=cb19d96dc54a4bd7b7192585cdec959d`
  // }

  fetchData = async () => {
    try {
      this.setState({ loading: true });
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=55701431df3b413882f4ba316e8e23b2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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

  fetchMoreData = async () => {
      const nextPage = this.state.page + 1;
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=55701431df3b413882f4ba316e8e23b2&page=${nextPage}&pageSize=${this.props.pageSize}`;
        const response = await fetch(url);
        if (response.ok) {
          const newData = await response.json();
          this.setState((prevState) => ({
            articles: prevState.articles.concat(newData.articles),
            totalResults: newData.totalResults,
            page: nextPage,
            loading: false,
          }));
        } else {
          console.error("Error fetching data");
          this.setState({ loading: false });
        }
      } catch (error) {
        console.error("Error:", error);
        this.setState({ loading: false });
      }
  };

  capitalizeIt = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  handleScroll = () => {
    clearTimeout(this.debounceScroll);
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.scrollHeight;
  
    if (scrollY + windowHeight + 2 >= bodyHeight && (this.state.articles.length !== this.state.totalResults)) {
      console.log("Fetching more data...");
      this.setState({loading: true})
      clearTimeout(this.debounceTimeout);  
      this.debounceTimeout = setTimeout(() => {
        this.fetchMoreData();
      }, 1500);
    }
  };

  componentDidMount() {
    this.fetchData();
    if (this.props.category !== "general") {
      document.title = `NewsWave | ${this.capitalizeIt(
        this.props.category
      )} News`;
    } else {
      document.title = "NewsWave - Discover Trending and Latest News";
    }
      window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      const { category } = this.props;
      if (category.split(" ").filter(Boolean).length > 0) {
        this.fetchData();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  

  render() {
    return (
      <div>
        <div className="bg-black flex justify-center items-center flex-col h-20 my-3 text-5xl text-center">
          {!this.state.loading &&
            (this.state.totalResults !== 0 ? (
              <h1 className="font-serif">
                Top {this.capitalizeIt(this.props.category)} Headlines
              </h1>
            ) : (
              <h2 className="mt-96">No News Available</h2>
            ))}
        </div>

        <div className="flex justify-center items-center">
          {this.state.loading && <Spinner />}
        </div>

          <div className="flex flex-row items-stretch flex-wrap mx-8">
            {this.state.articles.map((article, index) => {
              return (
                <NewsItem
                  key={index}
                  source={article.source.name}
                  title={article.title}
                  url={article.url}
                  urlToImage={article.urlToImage}
                  description={article.description}
                  publishTime={new Date(article.publishedAt)}
                />
              );
            })}
          </div>

          {this.state.loading && this.state.articles.length < this.state.totalResults && (
            <div className="flex justify-center items-center m-12 h-20">
              <Spinner />
            </div>
          )}
      </div>
    );
  }
}

export default News;
