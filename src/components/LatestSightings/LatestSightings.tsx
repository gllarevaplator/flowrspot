import React, { useState, useEffect } from "react";
import SightingCard from "../SightingCard/SightingCard";
import { Sightings, sightingsList } from "../../models/sightings";
import { getSightings } from "../../services/getSightings";
import "./latestSightings.css";

const LatestSightings: React.FC = () => {
  const [sightings, setSightings] = useState<[] | sightingsList>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getSightings()
      .then((sightings: sightingsList) => setSightings(sightings))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="sighting__container">
        <div className="row sighting__description">
          <div className="col-md-6 align-self-end">
            <h1 className="header__sightings white__text">Sighting List</h1>
            <p className="description__sightings white__text">
              Explore between more than 8.427 sightings
            </p>
          </div>
          <div className="col-md-6 add__sightings__container">
            <button className="primary__button px-5 py-3 add__sightings__button">
              + Add Sighting
            </button>
          </div>
        </div>
      </div>
      <div className="m-4 grid-container mt-4">
        {sightings.map((sighting: Sightings) => (
          <SightingCard
            key={sighting.id}
            name={sighting.name}
            picture={sighting.picture}
            comments_count={sighting.comments_count}
            likes_count={sighting.likes_count}
            longitude={sighting.longitude}
            latitude={sighting.latitude}
            description={sighting.description}
          />
        ))}
      </div>
    </>
  );
};

export default LatestSightings;
