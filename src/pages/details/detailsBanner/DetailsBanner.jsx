import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { VideoPopup } from "../../../components/videoPopup/VideoPopUp";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/UseFetch.jsx";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn.jsx";


const DetailsBanner = () => {

    

    const {mediaType, id} = useParams();
    const { data, loading } = useFetch(`/${mediaType || 'show'}/${id}`);
    const [show,setShow] = useState(false);
    const [videoUrl,setVideoUrl] = useState(null);
   

    let filteredData;
    
    if (data) {
        if (mediaType === 'show') {
            // Filter data for shows
            filteredData = data.show || [];
           
        } else if (mediaType === 'movie') {
            // Filter data for movies
            filteredData = data.movie || [];
            
        } else {
            // Handle other cases or set a default value
            filteredData = [];
        }
    } else {
        // Handle case where data is not yet available
        filteredData = [];
    }
    
    

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                {!!data && (
                    <React.Fragment>
                        
                        <div className="backdrop-img">
                            <Img src={filteredData ?.backdrop_path}/>
                        </div>
                        <div className="opacity-layer"></div>
                        <ContentWrapper>
                            <div className="content">
                                        <div className="left">
                                            {filteredData ?.poster_path ? (
                                                <Img className="posterImg" src={filteredData ?.poster_path}/>
                                            ):( 
                                                <Img className="posterImg" src={PosterFallback}/>)}
                                        </div>
                                        <div className="right">
                                            <div className="title">
                                                        {`${
                                                            filteredData ?.title
                                                        } (${dayjs(
                                                            filteredData ?.release_date
                                                        ).format("YYYY")})`}
                                            </div>
                                            <Genres data={filteredData ?.genres} />

                                            <div className="row">
                                            <CircleRating
                                                rating={filteredData?.vote_average ? filteredData?.vote_average.toFixed(1) : "0000"}
                                            />

                                            <div
                                                className="playbtn"
                                                onClick={() => {
                                                    setShow(true);
                                                    setVideoUrl(filteredData ?.youtube_trailer);
                                                }}
                                            >
                                                <PlayIcon />
                                                <span className="text">
                                                    Watch Trailer
                                                </span>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {filteredData ?.overview}
                                            </div>
                                        </div>

                                        <div className="info">
                                           
                                        {filteredData ? (
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    {mediaType === 'show' ? 'Release Date' : 'Release Date'}:{" "}
                                                </span>
                                                <span className="text">
                                                    {dayjs(
                                                        mediaType === 'show' ? filteredData.first_aired : filteredData.release_date
                                                    ).format("MMM D, YYYY")}
                                                </span>
                                            </div>
                                        ) : null}
                                        </div>

                                        
                                        <div className="info">
                                                <span className="text bold">
                                                    source:{" "}
                                                </span>
                                                <span className="text">
                                                <span className="text">
                                                           {filteredData ?.sources[0].source}
                                                    </span>
                                                </span>
                                        </div>
                                       
                                        <div className="info">
                                                <span className="text bold">
                                                    views:{" "}
                                                </span>
                                                <span className="text">
                                                <span className="text">
                                                           {filteredData ?.vote_count}
                                                    </span>
                                                </span>
                                        </div>
                                     
                                    </div>
                            </div>
                            <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoUrl={videoUrl}
                            />
                        </ContentWrapper>
                    </React.Fragment>
                )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;