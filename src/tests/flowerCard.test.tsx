import { render, screen } from "@testing-library/react";
import FlowerCard from "../components/Flowers/FlowerCard/FlowerCard";
import { Flowers } from "../models/flowers";

const cardProps: Flowers = {
  id: 1,
  name: "test",
  latin_name: "test",
  sightings: 12,
  profile_picture: "test.png",
  favorite: false,
};

test("render FlowerCard component", () => {
  const { id, name, latin_name, sightings, profile_picture, favorite } =
    cardProps;
  render(
    <FlowerCard
      id={id}
      name={name}
      latin_name={latin_name}
      sightings={sightings}
      profile_picture={profile_picture}
      favorite={favorite}
    />
  );
  const flowerElement = screen.getByTestId("flower");
  expect(flowerElement).toBeInTheDocument();
});
