import React from "react";

function limitText(text, maxWords) {
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
}

function countDays(publishTime) {
  const currentDate = new Date();
  const today = currentDate;
  
  const publishDate = new Date(publishTime);
  const timeDifference = today - publishDate;

  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const days = Math.floor(timeDifference / millisecondsInADay);

  if(days === 0) {
    return "Published Today"
  } else if (days === 1) {
    return "1 Day Ago"
  } else {
    return days + " Days Ago"
  }
}

const News = (props) => {
    let {description, source, title, url, urlToImage, publishTime} = props;
    const limitedText = limitText(description || " ", 20);
    const publishedAt = countDays(publishTime)

    return (
      <div className="px-6 py-6 md:w-1/3">
        <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
          <img
            className="lg:h-64 md:h-32 w-full object-cover object-center"
            src={urlToImage? urlToImage : "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";
            }}
            alt="news"
          />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
              {source}
            </h2>
            <h1 className="title-font text-lg font-medium text-white mb-3">
              {title}
            </h1>
            <p className="leading-relaxed mb-3">
              {limitedText}
            </p>
            <div className="flex items-center flex-wrap mt-2">
              <a className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0" href={url}>
                Read More
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
              <span className="text-gray-500 ml-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pl-3 py-1 border-l-2 border-gray-800">
                {publishedAt}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default News;