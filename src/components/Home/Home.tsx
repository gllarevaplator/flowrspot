import React, { useState, useEffect } from "react";
import "./home.css";
import DiscoverFlowers from "../DiscoverFlowers/DiscoverFlowers";
import { getFlowers } from "../../services/getFlowers";
import { Flowers } from "../../models/flowers";
import FlowerCard from "../FlowerCard/FlowerCard";

const Home: React.FC = () => {
  const [flowers, setFlowers] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getFlowers()
      .then((data) => setFlowers(data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [flowers]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <DiscoverFlowers />
      <div className="container grid-container mt-4">
        {flowers.map((flower: Flowers) => (
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
  );
};

export default Home;
