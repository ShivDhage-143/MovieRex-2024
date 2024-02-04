import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./style.scss";

const SearchResult = () => {
    const { query } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApiData();
    }, [query]);

    const fetchApiData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://movies-api14.p.rapidapi.com/search', {
                params: {
                    query: query
                },
                headers: {
                    'X-RapidAPI-Key': '7dc0d40869msh266de48880a185cp105cc3jsnd8bd53250617',
                    'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
                }
            });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    // Check if data is null before accessing properties
    if (data === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.contents?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${
                                    data?.contents > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.contents?.length || []}
                                loader={<Spinner />}
                            >
                                {data?.contents.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;
