import React, { useEffect, useState } from "react";
import DiscoverFlowers from "../Flowers/DiscoverFlowers/DiscoverFlowers";
import FlowerCard from "../Flowers/FlowerCard/FlowerCard";
import Flower from "../../models/flowers";
import {
  useGetFlowersQuery,
  useGetSearchedFlowersQuery,
} from "../../features/services/flowersApi";
import { useAppSelector } from "../../features/app/store";
import PaginationForm from "../Pagination/Pagination";
import "./home.css";

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isSuccess, isError } = useGetFlowersQuery(page);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
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
      {isLoading && <p className="text-center m-4">Loading...</p>}
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
