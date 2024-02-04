import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import PosterFallback from "../../assets/no-poster.png";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import Genres from "../genres/Genres";
import "./style.scss";

const Carousel = ({ data, loading, title }) => {
    const carouselContainer = useRef();
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path ? item.poster_path : PosterFallback; 
                            return (
                                <div
                                    key={item._id}
                                    className="carouselItem"
                                    onClick={() =>
                                        navigate(
                                            `/${item.contentType }/${item._id}`
                                        )
                                    }
                                >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                
                                        <Genres
                                            data={item.genres.slice(0, 1) ? item.genres : " " }
                                        />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.release_date ? item.release_date : "00/00/00" ).format(
                                                "MMM D, YYYY"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;