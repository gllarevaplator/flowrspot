import React, { useState, useEffect } from "react";
import axios from "axios";

const WithFetchData = (baseUrl: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [baseUrl]);

  const fetchData = async () => {
    const response = await axios.get(baseUrl);
    const data = response.data;
    setData(data);
    setLoading(false);
  };

  return {
    data,
    loading,
  };
};

export default WithFetchData;
