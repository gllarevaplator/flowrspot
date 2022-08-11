import {get} from './apiService';

export const getFlowers = async () => {
    const { data } = await get('/flowers?page=1');
    return data.flowers;
}
