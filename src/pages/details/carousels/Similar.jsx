import React from "react";
import { useParams } from "react-router-dom";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/UseFetch";


const Similar = () => {
    const {mediaType, id} = useParams();
    const { data, loading } = useFetch(`/${mediaType || 'show'}/${id}`);
    

    let filteredData;
    
    if (data) {
        if (mediaType === 'show') {
            // Filter data for shows
            filteredData = data.similarMovies || [];
           
        } else if (mediaType === 'movie') {
            // Filter data for movies
            filteredData = data.similarMovies || [];
            
        } else {
            // Handle other cases or set a default value
            filteredData = [];
        }
    } else {
        // Handle case where data is not yet available
        filteredData = [];
    }

    const title = mediaType === "show" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Carousel
            title={title}
            data={filteredData}
            loading={loading}
        />
    );
};

export default Similar;