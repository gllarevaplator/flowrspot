import React from "react";
import { Sightings } from "../../../models/sightings";
import like from "../../../icons/like.svg";
import comment from "../../../icons/comment.svg";
import location from "../../../icons/location.svg";
import { useAppSelector } from "../../../features/app/store";
import "./sightingCard.css";

const SightingCard: React.FC<Sightings> = ({
  picture,
  likes_count,
  comments_count,
  description,
  flower,
}) => {
  const user = useAppSelector((state) => state.user);

  return (
    <div className="sighting__card">
      <div className="sighting__location">
        <img src={location} alt="location-icon" />
        <p>Prishtinë, KS</p>
      </div>
      <div className="sighting__card__body">
        <img src={picture} alt="" className="sighting__card__image" />
        <div className="sighting__image__overlay"></div>
      </div>
      <div className="sightings__card__body p-4">
        <div className="d-flex sighting__profile">
          <div className="profile__image__container">
            <img
              className="sighting__profile__image"
              src={picture}
              alt=""
              width="50px"
              height="auto"
            />
          </div>
          <div className="sighting__profile__info">
            <h4>{flower?.name}</h4>
            {user.id && (
              <h5 className="sighting__author">
                by {user?.first_name} {user?.last_name}
              </h5>
            )}
          </div>
        </div>
        <div>
          <div className="description__container">
            <p className="sighting__card__description">{description}</p>
          </div>
          <div className="d-flex justify-content-around">
            <div>
              <img src={like} alt="" />
              <span className="px-2 sighting__likes">{likes_count} Likes</span> 
            </div>
            <div>
              <img src={comment} alt="" />
              <span className="px-2 sighting__comments">
                {comments_count} Comments
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SightingCard;
