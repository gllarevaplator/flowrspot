import React from "react";
import "./discoverFlowers.css";
import search from "../../icons/search.svg";

const DiscoverFlowers: React.FC = () => {
  return (
    <div className="discover__container">
      <div className="discover__description">
        <h1>Discover flowers around you</h1>
        <p>Explore between more than 8.427 sightings</p>
        <form>
          <div>
            <input
              type="search"
              name="search"
              id="search"
              className="form-control search__box"
              placeholder="Looking for something specific?"
            />
            <div className="search__container">
              <img src={search} alt="search-icon" className="search__icon" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiscoverFlowers;
