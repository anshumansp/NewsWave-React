import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <header className="text-gray-400 bg-gray-900 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a
              className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
              href="/"
            >
              <img
                src="/logo.png"
                className="w-10 mt-1 h-10 text-white p-2 rounded-full"
                alt=""
              />
              <span className="ml-3 text-xl">NewsWave</span>
            </a>

            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
              <a className="mr-7 cursor-pointer hover:text-white" href="/">
                Home
              </a>
              <a className="mr-7 cursor-pointer hover:text-white" href="/">
                Categories
              </a>
              <a className="mr-7 cursor-pointer hover:text-white" href="/">
                About
              </a>
              <a className="mr-7 cursor-pointer hover:text-white" href="/">
                Contact Us
              </a>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

export default Navbar;
