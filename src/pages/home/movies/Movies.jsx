
import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/UseFetch";

const Movies = () => {

    const { data, loading } = useFetch(`/movies`);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Movies</span>
            </ContentWrapper>
            <Carousel data={data?.movies} loading={loading} />
        </div>
    );
};

export default Movies;