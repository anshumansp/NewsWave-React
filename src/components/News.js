import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [debounceFetchMore, setDebounceFetchMore] = useState(null);

  const capitalizeIt = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const fetchData = async () => {
    try {
      props.setProgress(20);
      setLoading(true)

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      props.setProgress(40);

      const response = await fetch(url);
      props.setProgress(70);

      if (response.ok) {
        const newData = await response.json();
        setArticles(newData.articles);
        setTotalResults(newData.totalResults);
        setLoading(false)
        props.setProgress(100);

      } else {
        console.error("Error fetching data");
        setLoading(false)
        props.setProgress(100);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false)
    }
  };

  const fetchMoreDataWithDebounce = () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((newData) => {
        setArticles(articles.concat(newData.articles));
        setTotalResults(newData.totalResults);
        setPage(nextPage);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  };
  
  const handleScroll = () => {
    clearTimeout(debounceFetchMore);
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.scrollHeight;

    if (scrollY + windowHeight + 2 >= bodyHeight && articles.length !== totalResults) {
      setLoading(true);
      console.log(articles.length, totalResults)
      setDebounceFetchMore(setTimeout(fetchMoreDataWithDebounce, 1500));
    }
  };

  useEffect(() => {
    fetchData(); 
    if (props.category !== "general") {
      document.title = `NewsWave | ${capitalizeIt(
        props.category
      )} News`;
    } else {
      document.title = "NewsWave - Discover Trending and Latest News";
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    } 
    // eslint-disable-next-line
  }, [])

  // useEffect((prevProps)=> {
  //   // eslint-disable-next-line
  //   if (props.category !== prevProps.category) {
  //     const { category } = props;
  //     if (category.split(" ").filter(Boolean).length > 0) {
  //       fetchData();
  //     }
  //   }
  // }, [props.category])

  useEffect(() => {
     // eslint-disable-next-line
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, [articles, totalResults]); 
 
  return (
      <div>
        <div className="bg-black flex justify-center items-center flex-col h-20 my-3 text-5xl text-center">
          {!loading &&
            (totalResults !== 0 ? (
              <h1 className="font-serif">
                Top {capitalizeIt(props.category)} Headlines
              </h1>
            ) : (
              <h2 className="mt-96">No News Available</h2>
            ))}
        </div>

        <div className="flex justify-center items-center">
          {loading && <Spinner />}
        </div>

          <div className="flex flex-row items-stretch flex-wrap mx-8">
            {articles.map((article, index) => {
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

          {(loading) && articles.length < totalResults && (
            <div className="flex justify-center items-center m-12 h-20">
              <Spinner/>
            </div>
          )}
      </div>
  );
}

News.defaultProps = {
  pageSize: 15,
  country: "in",
  category: "general",
};

News.propTypes = {
  pageSize: PropTypes.number.isRequired,
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;