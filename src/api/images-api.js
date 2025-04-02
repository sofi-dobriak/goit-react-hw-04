import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com';
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH__KEY;

export const fetchImages = async (query, page = 1) => {
    const response = await axios.get(`${BASE_URL}/search/photos?`, {
        params: {
            client_id: ACCESS_KEY,
            query: query,
            page: page,
            per_page: 12,
            orientation: 'landscape',
        },
    });
    return response.data;
};
