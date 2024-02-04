import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/UseFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import "./style.scss";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const {data, loading} = useFetch('/movies');

  useEffect(()=>{
      const bg= data?.movies?.[Math.floor(Math.random() * 20)]?.backdrop_path ;
      setBackground(bg);
  },[data]);


  const searchQueryHandler = (event) =>{
         if(event.key === "Enter" && query.length > 0){
              navigate(`/search/${query}`) ;  
         }
  }

  return (
    <div className="heroBanner">
                {
                !loading && 
                <div className="backdrop-img">
                    <Img src={background}></Img>
                </div>
                }

       <div className="opacity-layer"></div>
       <ContentWrapper>
                  <div className="heroBannerContent">
                          <span className="title"><span id='Wcolor'>W</span>elcome.</span>
                          <span className="sub-Title">
                          </span>

                          <div className="searchInput">
                                  <input
                                    onKeyUp={searchQueryHandler} 
                                    onChange={(e)=> setQuery(e.target.value)}
                                    type="text"
                                    placeholder="Search for a movie and tv show..." 
                                  />
                                  <button>Search</button>
                          </div>
                  </div> 
          </ContentWrapper>       
    </div>
  );
};

export default HeroBanner;