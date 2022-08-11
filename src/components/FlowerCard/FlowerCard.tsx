import React from "react";
import { Flowers } from "../../models/flowers";
import favoriteIcon from "../../icons/star-filled.svg";
import nonFavoriteIcon from "../../icons/star-outlined.svg";
import "./flowerCard.css";

const FlowerCard: React.FC<Flowers> = ({
  latin_name,
  name,
  sightings,
  profile_picture,
  favorite,
  user,
}) => {
  const favoriteFlower = favorite ? favoriteIcon : nonFavoriteIcon;

  return (
    <div className="card">
      {user && (
        <>
          <div className="favorite__flower">
            <img src={favoriteFlower} />
          </div>
        </>
      )}
      <div className="card__body">
        <img src={profile_picture} alt="" className="card__image" />
        <div className="image__overlay"></div>
        <div className="card__description">
          <h4>{name}</h4>
          <p>{latin_name}</p>
        </div>
      </div>
      <div className="card__button text-center">
        <span>{sightings} Sightings</span>
      </div>
    </div>
  );
};
export default FlowerCard;
