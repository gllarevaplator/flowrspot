export interface Flowers {
    id: number;
    name: string;
    latin_name: string;
    sightings: number;
    profile_picture?: string;
    favorite: Boolean;
    user?: any;
  }

  export interface FlowersList {
    flowers: Flowers[];
  }