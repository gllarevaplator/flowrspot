import React, { useState, useCallback } from "react";
import SightingCard from "../SightingCard/SightingCard";
import CreateSightingModal from "../../Modals/CreateSightingModal";
import { Sightings } from "../../../models/sightings";
import { useGetSightingsQuery } from "../../../features/services/sightingsApi";
import { useAppSelector } from "../../../features/app/store";
import PaginationForm from "../../Pagination/Pagination";
import "./latestSightings.css";

const LatestSightings: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const [page, setPage] = useState<number>(1);
  const [openCreateSightingModal, setOpenCreateSightingModal] =
    useState<boolean>(false);
  const handleOpenCreateSightingModal = () => setOpenCreateSightingModal(true);
  const handleCloseCreateSightingModal = () =>
    setOpenCreateSightingModal(false);
  const { data, isSuccess, isLoading, isError } = useGetSightingsQuery(page);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number): void => {
      setPage(value);
    },
    [page]
  );

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
          {user.id && (
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
      {isLoading && <p className="text-center m-2">Loading...</p>}
      {isError && <p className="text-center m-2">Something went wrong...</p>}
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
      />
      {isSuccess && (
        <PaginationForm
          defaultPage={1}
          count={data?.meta.pagination.total_pages}
          page={page}
          onChange={handlePageChange}
        />
      )}
    </>
  );
};

export default LatestSightings;
