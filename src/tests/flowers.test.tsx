import { render, waitFor, screen } from "@testing-library/react";
// import Home from "../components/Home/Home";
// import axios from "axios";
// import { FlowersList } from "../models/flowers";
// import FlowerCard from "../components/Flowers/FlowerCard/FlowerCard";

// jest.mock("axios");

// const allFlowers = [
//   {
//     id: 1,
//     name: "test",
//     latin_name: "test",
//     sightings: 12,
//     profile_picture: "",
//     favorite: false,
//   },
//   {
//     id: 2,
//     name: "test",
//     latin_name: "test",
//     sightings: 12,
//     profile_picture: "",
//     favorite: false,
//   },
//   {
//     id: 3,
//     name: "test",
//     latin_name: "test",
//     sightings: 12,
//     profile_picture: "",
//     favorite: false,
//   },
// ];

// test("flowers list", async () => {
//   axios.get.mockResolvedValue<any>({ data: allFlowers });
//   render(<FlowerCard />);

//   const flowersList = await waitFor(() => screen.findAllByTestId("flowers"));
//   expect(flowersList).toHaveLength(10);
// });
