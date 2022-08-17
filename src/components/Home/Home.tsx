import React, { useState, useEffect, useCallback } from "react";
import DiscoverFlowers from "../Flowers/DiscoverFlowers/DiscoverFlowers";
import { getFlowers } from "../../services/getFlowers";
import { Flowers, FlowersList } from "../../models/flowers";
import FlowerCard from "../Flowers/FlowerCard/FlowerCard";
import { get } from "../../services/apiService";
import "./home.css";

interface HomeProps {
  user: object | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [flowers, setFlowers] = useState<[] | FlowersList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [searchedFlowers, setSearchedFlowers] = useState<[]>([]);
  const [searchFlowersFound, setSearchFlowersFound] = useState<boolean>(false);
  const [noFlowerFoundMessage, setNoFlowerFoundMessage] = useState<string>("");

  useEffect(() => {
    getFlowers()
      .then((flowers: FlowersList) => setFlowers(flowers))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (typeof search === "string" && search.trim().length == 0)
      setSearchedFlowers([]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await get(`/flowers/search?query=${search}`);
      if (data.flowers.length === 0) {
        setSearchFlowersFound(true);
        setNoFlowerFoundMessage("NO FLOWER MATCHED YOUR SEARCH :(");
      } else {
        setSearchFlowersFound(false);
        setNoFlowerFoundMessage("");
        setSearchedFlowers(data.flowers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredFlowers: FlowersList =
    searchedFlowers.length > 0 &&
    typeof search === "string" &&
    search.trim().length > 0
      ? searchedFlowers
      : flowers;

  return (
    <>
      <DiscoverFlowers
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {searchFlowersFound && (
        <h4 className="text-center m-4">{noFlowerFoundMessage}</h4>
      )}
      {loading ? <p className="text-center m-4">Loading...</p> : null}
      {!searchFlowersFound && (
        <div className="m-4 grid-container mt-4">
          {filteredFlowers.map((flower: Flowers) => (
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
      )}
    </>
  );
};

export default Home;
