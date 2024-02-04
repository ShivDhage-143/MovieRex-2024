import React from 'react';
import HeroBanner from './heroBanner/HeroBanner';
import Movies from './movies/Movies';
import "./style.scss";
import TvShows from './tvShows/TvShow';


const Home = () => {
  return (
    <div className='homepage'>
         <HeroBanner></HeroBanner>
         <Movies></Movies>
         <TvShows></TvShows>
    </div>
  )
}

export default Home;