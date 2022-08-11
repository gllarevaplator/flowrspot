import axios from "axios";

const url: string = "https://flowrspot-api.herokuapp.com/api/v1";


export const get = (endpoint: string) => {
  return axios.get(url + endpoint);
};

export const post = (endpoint: string, create: Object) => {
  return axios.post(url + endpoint, create);
};
