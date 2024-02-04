import axios from "axios";

const BASE_URL = "https://movies-api14.p.rapidapi.com";

const headers = {
    'X-RapidAPI-Key':'7dc0d40869msh266de48880a185cp105cc3jsnd8bd53250617' ,
    'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
};

export const fetchDataFromApi = async (url, searchquery) => {
    try {
        const response = await axios.get(BASE_URL + url, {
            headers,
            params: {
                query: searchquery // No need for object wrapper here
            }
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching data:", err);
        throw err; // Re-throw the error for the caller to handle
    }
};
