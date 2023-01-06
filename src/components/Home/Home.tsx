import React, { useState } from "react";
import DiscoverFlowers from "../Flowers/DiscoverFlowers/DiscoverFlowers";
import FlowerCard from "../Flowers/FlowerCard/FlowerCard";
import Flower from "../../models/flowers";
import { useGetFlowersQuery } from "../../features/services/flowersApi";
import { useAppSelector } from "../../features/app/store";
import "./home.css";

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isSuccess } = useGetFlowersQuery(search);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <DiscoverFlowers
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {data?.flowers.length === 0 && (
        <p className="text-center m-4">No Flower Found...</p>
      )}
      {isLoading && <p className="text-center m-4">Loading...</p>}
      {isSuccess && (
        <>
          <div className="m-4 grid-container mt-4">
            {data.flowers.map((flower: Flower) => (
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
        </>
      )}
    </>
  );
};

export default Home;
