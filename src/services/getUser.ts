import jwt_decode from "jwt-decode";
import {get} from './apiService';

export const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    let userId;
    if (token) {
      const decodedToken: any = jwt_decode(token);
      userId = decodedToken.user_id;
      const { data } = await get(`/users/${userId}`);
      return data.user;
    } else {
      return null;
    }
  };