import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

class News extends Component {
  static defaultProps = {
    pageSize: 18,
    country: "in",
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
      coChanging: false
    };
    this.debounceTimeout = null;
  }

  fetchData = async () => {
    try {
      this.props.setProgress(20);
      this.setState({ loading: true });

      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.props.setProgress(40);

      const response = await fetch(url);
      this.props.setProgress(70);

      if (response.ok) {
        const newData = await response.json();
        this.setState({
          articles: newData.articles,
          totalResults: newData.totalResults,
          loading: false,
        });

        this.props.setProgress(100);
        this.setState({coChanging : false})
      } else {
        console.error("Error fetching data");
        this.props.setProgress(100);
        this.setState({ loading: false, coChanging: false });
      }
    } catch (error) {
      console.error("Error:", error);
      this.setState({ loading: false, coChanging: false });
    }
  };

  fetchMoreData = async () => {
      const nextPage = this.state.page + 1;
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
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
    this.setState({coChanging : true})
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
    if (this.props.country !== prevProps.country) {
      this.setState({coChanging : true})
      this.fetchData();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }  

  render() {
    return (
      <div>
        <div className="bg-black flex justify-center items-center flex-col h-20 mb-3 mt-32 text-5xl text-center">
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
            {!this.state.coChanging && this.state.articles.map((article, index) => {
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

          {!this.state.coChanging && this.state.loading && this.state.articles.length < this.state.totalResults && (
            <div className="flex justify-center items-center m-12 h-20">
              <Spinner />
            </div>
          )}
      </div>
    );
  }
}

export default News;
