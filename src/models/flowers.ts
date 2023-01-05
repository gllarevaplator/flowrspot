import {UserState} from '../features/user/userSlice';

export default interface Flower {
    id: number,
    name: string,
    latin_name: string,
    sightings: number,
    profile_picture: string,
    favorite: boolean,
    user: UserState,
  }