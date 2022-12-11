import axios from "axios";

export const baseUrl: string = "https://flowrspot-api.herokuapp.com/api/v1";


export const get = (endpoint: string): Promise<any> => {
  return axios.get(baseUrl + endpoint);
};

export const post = (endpoint: string, create: object, headers?: object): Promise<any> => {
  return axios.post(baseUrl + endpoint, create, headers);
};
