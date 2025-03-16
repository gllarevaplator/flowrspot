"use client";

import React, { useEffect, useState } from "react";

import DiscoverFlowers from "../components/Flowers/DiscoverFlowers/DiscoverFlowers";
import FlowerCard from "../components/Flowers/FlowerCard/FlowerCard";
import Flower from "../models/flowers";
import { useAppSelector } from "../features/app/store";
import { useGetFlowersQuery } from "../features/services/flowersApi";
import { useMarkFavoriteFlowerMutation } from "../features/services/favoritesApi";
import PaginationForm from "../components/Pagination/Pagination";
import swal from "sweetalert";
// import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isSuccess, isError } = useGetFlowersQuery({
    searchQuery,
    page,
  });
  const [
    markFavoriteFlower,
    { isSuccess: markedSuccess, isError: markedError },
  ] = useMarkFavoriteFlowerMutation();
  //   const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 0) {
      setPage(1);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (markedSuccess) {
      swal({
        title: "Flower added successfully on your favorites page :)",
        icon: "success",
        buttons: {
          deny: { text: "OK", className: "primary__button text-center" },
          confirm: {
            text: "GO TO FAVORITES PAGE",
            className: "primary__button text-center",
          },
        },
      }).then((response: boolean): void => {
        if (response === true) {
          //   navigate("/favorites");
        }
      });
    }
    if (markedError) {
      swal({
        title:
          "You already marked this flower as favorite, please try another one!",
        icon: "error",
        buttons: {
          deny: { text: "OK", className: "primary__button text-center" },
        },
      });
    }
  }, [markedSuccess, markedError]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setPage(value);
  };

  const handleFavorite = (flower_id: number, singleFlower: Flower) => {
    const flower = { ...singleFlower };
    flower.favorite = !flower.favorite;
    markFavoriteFlower({ flower_id, flower });
  };

  return (
    <>
      <DiscoverFlowers
        search={searchQuery}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {data?.flowers.length === 0 && (
        <p className="text-center m-4">No Flower Found...</p>
      )}
      {isLoading && <p className="text-center m-4">Loading Flowers...</p>}
      {isError && <p className="text-center m-2">Something went wrong...</p>}
      {isSuccess && (
        <>
          <div className="container">
            <div className="m-4 grid-container mt-4">
              {data?.flowers.map((flower: Flower) => (
                <FlowerCard
                  id={flower.id}
                  key={flower.id}
                  latin_name={flower.latin_name}
                  name={flower.name}
                  sightings={flower.sightings}
                  profile_picture={flower.profile_picture}
                  favorite={flower.favorite}
                  user={user}
                  handleFavorite={() => handleFavorite(flower.id, flower)}
                />
              ))}
            </div>
            <PaginationForm
              defaultPage={1}
              count={data?.meta.pagination.total_pages}
              page={page}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
