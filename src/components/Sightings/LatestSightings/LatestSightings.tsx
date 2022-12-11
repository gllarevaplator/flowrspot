import React, { useState, useEffect, useCallback } from "react";
import SightingCard from "../SightingCard/SightingCard";
import CreateSightingModal from "../../Modals/CreateSightingModal";
import { Sightings, sightingsList } from "../../../models/sightings";
import { getSightings } from "../../../services/getSightings";
import "./latestSightings.css";

interface LatestSightingsProps {
  user: object | null;
}

const LatestSightings: React.FC<LatestSightingsProps> = ({ user }) => {
  const [sightings, setSightings] = useState<sightingsList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openCreateSightingModal, setOpenCreateSightingModal] =
    useState<boolean>(false);
  const handleOpenCreateSightingModal = () => setOpenCreateSightingModal(true);
  const handleCloseCreateSightingModal = () =>
    setOpenCreateSightingModal(false);

  const newSightingCallback = useCallback(
    (createdNewSighting: sightingsList) => setSightings(createdNewSighting),
    []
  );

  const loadingCallback = useCallback((bool: boolean) => setLoading(bool), []);

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
          {user && (
            <div className="col-md-6 add__sightings__container">
              <button
                className="primary__button px-5 py-3 add__sightings__button"
                onClick={handleOpenCreateSightingModal}
              >
                + Add Sighting
              </button>
            </div>
          )}
        </div>
      </div>
      {loading && <p className="text-center m-2">Loading...</p>}
      <div className="m-4 grid__sighting__container mt-4">
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
            flower={sighting.flower}
            user={sighting?.user}
          />
        ))}
      </div>
      <CreateSightingModal
        open={openCreateSightingModal}
        handleOpen={handleOpenCreateSightingModal}
        handleClose={handleCloseCreateSightingModal}
        sightings={sightings}
        newSightingCallback={newSightingCallback}
        loadingCallback={loadingCallback}
      />
    </>
  );
};

export default LatestSightings;
