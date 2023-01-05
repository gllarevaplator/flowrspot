import React, { useState, useEffect, useCallback } from "react";
import SightingCard from "../SightingCard/SightingCard";
import CreateSightingModal from "../../Modals/CreateSightingModal";
import { Sightings } from "../../../models/sightings";
import { useGetSightingsQuery } from "../../../features/services/sightingsApi";
import "./latestSightings.css";

const LatestSightings: React.FC = () => {
  const [openCreateSightingModal, setOpenCreateSightingModal] =
    useState<boolean>(false);
  const handleOpenCreateSightingModal = () => setOpenCreateSightingModal(true);
  const handleCloseCreateSightingModal = () =>
    setOpenCreateSightingModal(false);
  const { data, isSuccess, isLoading, isError } =
    useGetSightingsQuery("/sightings");

  // const newSightingCallback = useCallback(
  // (createdNewSighting: sightingsList) => setSightings(createdNewSighting),
  // []
  // );

  // const loadingCallback = useCallback((bool: boolean) => setLoading(bool), []);

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
          {/* {user && ( */}
          <div className="col-md-6 add__sightings__container">
            <button
              className="primary__button px-5 py-3 add__sightings__button"
              onClick={handleOpenCreateSightingModal}
            >
              + Add Sighting
            </button>
          </div>
          {/* )} */}
        </div>
      </div>
      {isLoading && <p className="text-center m-2">Loading...</p>}
      {isSuccess && (
        <div className="m-4 grid__sighting__container mt-4">
          {data.sightings.map((sighting: Sightings) => (
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
            />
          ))}
        </div>
      )}
      <CreateSightingModal
        open={openCreateSightingModal}
        handleOpen={handleOpenCreateSightingModal}
        handleClose={handleCloseCreateSightingModal}
        // sightings={sightings}
        // newSightingCallback={newSightingCallback}
        // loadingCallback={loadingCallback}
      />
    </>
  );
};

export default LatestSightings;
