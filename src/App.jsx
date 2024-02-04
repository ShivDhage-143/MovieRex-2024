import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchDataFromApi } from './utils/api';
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration} from './store/homeSlice';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from './pages/home/Home';
import SearchResult from './pages/searchResult/SearchResult';
// import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Details from './pages/details/Details';



function App() {
  
  const dispatch = useDispatch();
  const {url} = useSelector((state) => state.home);

  useEffect(() =>{
    fetchApiImages();
  }, []);
  
   const fetchApiImages = () => {
    fetchDataFromApi('/movies').then((res) =>{
       const url = {
            backdrop: res.movies.backdrop_path,
            poster: res.movies.poster_path,
         };

      dispatch(getApiConfiguration(url));
    });
   };
   
  
  return (
    <BrowserRouter>
      <Header></Header>
         <Routes>
           <Route path="/" element = {<Home/>}/>
           <Route path="/:mediaType/:id" element = {<Details/>}/>
           <Route path="/search/:query" element = {<SearchResult/>}/>
           {/* <Route path="/explore/:mediaType" element = {<Explore/>}/> */}
           <Route path="*" element = {<PageNotFound/>}/>
        </Routes> 
      <Footer></Footer>  
    
    </BrowserRouter>
    
  )
}

export default App;
