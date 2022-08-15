import React from "react";
import { Sightings } from "../../models/sightings";
import favoriteIcon from "../../icons/star-filled.svg";
import nonFavoriteIcon from "../../icons/star-outlined.svg";
import "./sightingCard.css";
import { useGeolocated } from "react-geolocated";

const SightingCard: React.FC<Sightings> = ({
  name,
  picture,
  likes_count,
  comments_count,
  longitude,
  latitude,
  description,
}) => {
  return (
    <div className="card">
      <div className="sighting__location">
        <img src={picture} alt="" />
      </div>
      <div className="card__body">
        <img src={picture} alt="" className="card__image" />
        <div className="image__overlay"></div>
        <div className="card__description">
          <h4 className="white__text ">{name}</h4>
          <p className="white__text text-center">{description}</p>
        </div>
      </div>
      <div className="card__button text-center">
        <span>{latitude} Sightings</span>
      </div>
    </div>
  );
};
export default SightingCard;
