import React, { useState, useEffect } from "react";
import { get } from "../../services/apiService";

const Sighting: React.FC = () => {
  const [sightings, setSightings] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    get("/sightings?page=1")
      .then(({ data }) => setSightings(data.sightings))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      {loading ? <p className="text-center m-4">Loading...</p> : null}
      {sightings.map((sighting) => (
        
      ))}
    </div>
  );
};

export default Sighting;
