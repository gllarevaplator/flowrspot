import React from "react";
import Flower from "../../../models/flowers";
import favoriteIcon from "../../../icons/star-filled.svg";
import nonFavoriteIcon from "../../../icons/star-outlined.svg";
import "./flowerCard.css";

const FlowerCard: React.FC<Flower> = ({
  latin_name,
  name,
  sightings,
  profile_picture,
  favorite,
  user,
}) => {
  const favoriteFlower: string = favorite ? favoriteIcon : nonFavoriteIcon;

  return (
    <div className="card" data-testid="flower">
      {user.id && (
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
          <h4 className="white__text ">{name}</h4>
          <p className="white__text text-center">{latin_name}</p>
        </div>
      </div>
      <div className="card__button text-center">
        <span>
          {sightings === 1
            ? `${sightings}  Sighting`
            : `${sightings}  Sightings`}
        </span>
      </div>
    </div>
  );
};
export default FlowerCard;
