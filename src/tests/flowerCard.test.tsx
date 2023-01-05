import { render, screen } from "@testing-library/react";
import FlowerCard from "../components/Flowers/FlowerCard/FlowerCard";
import Flower from "../models/flowers";

const cardProps: Flower = {
  id: 1,
  name: "test",
  latin_name: "test",
  sightings: 12,
  profile_picture: "test.png",
  favorite: false,
  user: {
    id: 1,
    first_name: "test",
    last_name: "test",
    token: "test",
  },
};

test("render FlowerCard component", () => {
  const { id, name, latin_name, sightings, profile_picture, favorite, user } =
    cardProps;
  render(
    <FlowerCard
      id={id}
      name={name}
      latin_name={latin_name}
      sightings={sightings}
      profile_picture={profile_picture}
      favorite={favorite}
      user={user}
    />
  );
  const flowerElement = screen.getByTestId("flower");
  expect(flowerElement).toBeInTheDocument();
});
