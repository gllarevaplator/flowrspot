import React from "react";
import { Sightings } from "../../models/sightings";
import favoriteIcon from "../../icons/star-filled.svg";
import nonFavoriteIcon from "../../icons/star-outlined.svg";
import "./sightingCard.css";
import { useGeolocated } from "react-geolocated";
import like from "../../icons/like.svg";
import comment from "../../icons/comment.svg";

const SightingCard: React.FC<Sightings> = ({
  name,
  picture,
  likes_count,
  comments_count,
  longitude,
  latitude,
  description,
  flower,
  user,
}) => {
  console.log(user);
  return (
    <div className="sighting__card m-2">
      <div className="sighting__location">
        <p></p>
      </div>
      <div className="sighting__card__body">
        <img src={picture} alt="" className="sighting__card__image" />
        <div className="sighting__image__overlay"></div>
      </div>
      <div className="sightings__card__body p-4">
        <div className="d-flex">
          <div style={{ width: "20%", height: "50px" }}>
            <img
              src={picture}
              alt=""
              width="50px"
              height="auto"
              style={{
                borderRadius: "50%",
              }}
            />
          </div>
          <div style={{ width: "80%" }}>
            <h4>{flower?.name}</h4>
            <h5>by {user?.full_name}</h5>
          </div>
        </div>
        <div>
          <p className="sighting__card__description">{description}</p>
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
