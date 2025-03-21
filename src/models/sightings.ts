import Flower from "./flowers";
import User from "./user";

export interface Sightings {
  id?: number;
  name: string;
  picture: string;
  comments_count: number;
  likes_count: number;
  description?: string;
  longitude: number;
  latitude: number;
  created_at?: Date | string;
  user?: User;
  flower?: Flower;
}
