import { Flowers } from "./flowers";

export interface Sightings{
    id?: number; 
    name: string;
    picture: string;
    comments_count: number;
    likes_count: number;
    description?: string;
    longitude: number;
    latitude: number;
    created_at?: Date | string;
    user?: object;
    flower?: Flowers;
}

export type sightingsList = Sightings[];