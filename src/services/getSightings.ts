import axios from 'axios';
import {get} from './apiService';

export const getSightings = async (): Promise<any> => {
    const {data} = await get('/sightings?page=1');
    return data.sightings;
}