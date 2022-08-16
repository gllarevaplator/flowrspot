import axios from "axios";

const baseURL: string = "https://flowrspot-api.herokuapp.com/api/v1";


export const get = (endpoint: string): Promise<any> => {
  return axios.get(baseURL + endpoint);
};

export const post = (endpoint: string, create: object, headers?: object): Promise<any> => {
  return axios.post(baseURL + endpoint, create, headers);
};
