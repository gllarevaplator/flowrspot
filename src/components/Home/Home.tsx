import React, { useState } from "react";
import DiscoverFlowers from "../Flowers/DiscoverFlowers/DiscoverFlowers";
import FlowerCard from "../Flowers/FlowerCard/FlowerCard";
import { Flowers } from "../../models/flowers";
import { useGetSearchedFlowersQuery } from "../../features/services/flowersApi";
import "./home.css";

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const { data, isError, isLoading, isSuccess } =
    useGetSearchedFlowersQuery(search);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <DiscoverFlowers search={search} handleChange={handleChange} />
      {data?.flowers.length === 0 && (
        <p className="text-center m-4">No Flower Found...</p>
      )}
      {isLoading && <p className="text-center m-4">Loading...</p>}
      {isSuccess && (
        <>
          <div className="m-4 grid-container mt-4">
            {data.flowers.map((flower: Flowers) => (
              <FlowerCard
                id={flower.id}
                key={flower.id}
                latin_name={flower.latin_name}
                name={flower.name}
                sightings={flower.sightings}
                profile_picture={flower.profile_picture}
                favorite={flower.favorite}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
