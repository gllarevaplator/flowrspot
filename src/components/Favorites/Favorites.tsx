import React, { useState, useEffect } from "react";
import {
  Favorite,
  useLazyGetFavoritesQuery,
} from "../../features/services/favoritesApi";
import { useAppSelector } from "../../features/app/store";
import FlowerCard from "../Flowers/FlowerCard/FlowerCard";
import PaginationForm from "../Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";

const Favorites: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const token = localStorage.getItem("user-token");
  const [getFavorites, { data, isSuccess, isError, isLoading }] =
    useLazyGetFavoritesQuery();
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getFavorites(page);
    } else {
      navigate("/");
    }
    return () => {};
  }, [token, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
  };

  return (
    <div>
      {data?.fav_flowers.length === 0 && (
        <Link to="/flowers">
          <p className="text-center m-4">
            Go to Flowers page to add favorite flowers
          </p>
        </Link>
      )}
      {isLoading && <p className="text-center m-4">Loading...</p>}
      {isError && <p className="text-center m-2">Something went wrong...</p>}
      {isSuccess && (
        <>
          <div className="container">
            <div className="m-4 grid-container mt-4">
              {data?.fav_flowers.map(({ flower }: Favorite) => (
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
              count={data?.meta.pagination.total_pages as number}
              page={page}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
