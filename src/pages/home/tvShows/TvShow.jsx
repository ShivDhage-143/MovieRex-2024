
import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/UseFetch";

const TvShows = () => {

    const { data, loading } = useFetch(`/shows`);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Tv Shows</span>
            </ContentWrapper>
            <Carousel data={data?.movies} loading={loading} />
        </div>
    );
};

export default TvShows;