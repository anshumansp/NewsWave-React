import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: "/",
      country: 'in'
    };
  }

  handleNavLinkClick = (to) => {
    this.setState({ activeLink: to });
  };

  onChange = (event) => {
    this.setState({ country: event.target.value });
    this.props.country(event.target.value)
  }

  render() {
    return (
      <div>
        <header className="fixed right-0 left-0 w-full top-0 text-gray-400 bg-gray-900 body-font">
          <div className="mx-auto flex flex-wrap p-6 flex-col md:flex-row items-center">
            <a
              className="flex title-font font-small items-center text-white mb-4 md:mb-0"
              href="/"
            >
              <img
                src="/logo.png"
                className="w-10 mt-1 h-10 text-white p-2 rounded-full"
                alt=""
              />
              <span className="ml-3 text-lg">NewsWave</span>
            </a>

            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center  text-lg justify-center">
              <Link
                to="/"
                className={`mr-7 cursor-pointer hover:text-white
                ${
                  this.state.activeLink === "/" ? "text-white" : "text-gray-400"
                }`}
                onClick={() => this.handleNavLinkClick("/")}
              >
                Home
              </Link>
              <Link
                to="/business"
                className={`mr-7 cursor-pointer hover:text-white
                ${
                  this.state.activeLink === "/business"
                    ? "text-white"
                    : "text-gray-400"
                }`}
                onClick={() => this.handleNavLinkClick("/business")}
              >
                Business
              </Link>
              <Link
                className={`mr-7 cursor-pointer hover:text-white
                ${
                  this.state.activeLink === "/technology"
                    ? "text-white"
                    : "text-gray-400"
                }`}
                onClick={() => this.handleNavLinkClick("/technology")}
                to="/technology"
              >
                Technology
              </Link>
              <Link
                className={`mr-7 cursor-pointer hover:text-white
                ${
                  this.state.activeLink === "/science"
                    ? "text-white"
                    : "text-gray-400"
                }`}
                onClick={() => this.handleNavLinkClick("/science")}
                to="/science"
              >
                Science
              </Link>
              <Link
                className={`mr-7 cursor-pointer hover:text-white
                ${
                  this.state.activeLink === "/health"
                    ? "text-white"
                    : "text-gray-400"
                }`}
                onClick={() => this.handleNavLinkClick("/health")}
                to="/health"
              >
                Health
              </Link>
              <Link
                className={`mr-7 cursor-pointer hover:text-white
                ${
                  this.state.activeLink === "/sports"
                    ? "text-white"
                    : "text-gray-400"
                }`}
                onClick={() => this.handleNavLinkClick("/sports")}
                to="/sports"
              >
                Sports
              </Link>
              <Link
                className={`mr-7 cursor-pointer hover:text-white
                ${
                  this.state.activeLink === "/entertainment"
                    ? "text-white"
                    : "text-gray-400"
                }`}
                onClick={() => this.handleNavLinkClick("/entertainment")}
                to="/entertainment"
              >
                Entertainment
              </Link>
              <Link
                className={`mr-7 cursor-pointer hover:text-white
                ${
                  this.state.activeLink === "/about"
                    ? "text-white"
                    : "text-gray-400"
                }`}
                onClick={() => this.handleNavLinkClick("/about")}
                to="/about"
              >
                About
              </Link>
            </nav>

            <div className="relative mr-2">
              <div>
                <select
                  className="w-36 text-white bg-gray-800 p-2 rounded"
                  value={this.state.country}
                  onChange={this.onChange}
                >
                  <option value="in">India</option>
                  <option value="us">USA</option>
                  <option value="gb">UK</option>
                  <option value="ca">Canada</option>
                  <option value="au">Australia</option>
                </select>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Navbar;