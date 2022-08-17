import React from "react";
import "./discoverFlowers.css";
import searchIcon from "../../../icons/search.svg";

interface DiscoverFlowersProps {
  search: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const DiscoverFlowers: React.FC<DiscoverFlowersProps> = ({
  search,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="discover__container">
      <div className="discover__description text-center">
        <h1 className="white__text">Discover flowers around you</h1>
        <p className="white__text">Explore between more than 8.427 sightings</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="search"
              name="search"
              id="search"
              value={search}
              onChange={handleChange}
              className="form-control search__box"
              placeholder="Looking for something specific?"
            />
            <div className="search__container">
              <button type="submit" className="search__button">
                <img
                  src={searchIcon}
                  alt="Search Icon"
                  className="search__icon"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiscoverFlowers;
