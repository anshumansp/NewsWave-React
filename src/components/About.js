import React, { Component } from "react";

export class About extends Component {
  render() {
    return (
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-10 mt-5 mx-auto flex flex-col">
            <div className="lg:w-4/6 mx-auto">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src="https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                />
              </div>
              <div className="flex flex-col sm:flex-row mt-20">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="w-20 h-20 inline-flex items-center justify-center text-gray-400">
                    <img
                      src="/logo.png"
                      className="w-20 mt-1 h-20 text-white p-2 rounded-full"
                      alt="logo"
                    />
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-gray-200 text-lg">
                      NewsWave
                    </h2>
                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                    <p className="text-base">
                      <em>
                        Bringing You Diverse and Verified News from Around the
                        World – Your Trusted Source for Informed Insights and
                        Engaging Stories.
                      </em>
                    </p>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <p className="leading-relaxed text-lg mt-8">
                    Welcome to NewsWave! Your trusted source for the latest and
                    most accurate news from around the world. With a commitment
                    to delivering real news from reputable sources, we cover a
                    diverse range of categories including politics, business,
                    technology, science, sports, and entertainment. Stay
                    informed and up-to-date with our comprehensive selection of
                    news articles, ensuring you're always in the know about
                    what's happening globally. Trust NewsWave to bring you the
                    news that matters, from the most reliable sources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default About;
