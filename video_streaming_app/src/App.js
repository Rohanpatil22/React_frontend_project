import React, { useEffect, useState } from "react"
import './App.css';
import axios from "axios";
import MovieCard from "./MovieCrad";

 function App() {
 const [movieData, setMovieData]=useState();
 const [urlLink, setUrlLink]=useState("https://api.themoviedb.org/3/trending/all/day?api_key=c72ff33d0282fe5abd382b77ceaff037");
 const [clickdDiv, setClickdDiv]=useState("trending");
 async function get_info()
  {
   const getdata=await axios.get(urlLink)
    .then((res)=>{
      let movieList=res.data;
       setMovieData(movieList);
    })
  }

  useEffect(()=>{
    get_info();
  },[urlLink]);

  function getFilterData(val)
  {
    
    if(val.id==="trending")
    {
      setUrlLink("https://api.themoviedb.org/3/trending/all/day?api_key=c72ff33d0282fe5abd382b77ceaff037");
      setClickdDiv("trending");
    }
    else if(val.id==="popular")
    {
      setUrlLink("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=c72ff33d0282fe5abd382b77ceaff037");
      setClickdDiv("popular");
    }
    else if(val.id==="toprated")
    {
      setUrlLink("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=c72ff33d0282fe5abd382b77ceaff037");
      setClickdDiv("toprated");
    }

    
  }
  return (
    <>
    <div style={{color:"black"}} className="flex w-1/3 bg-stone-500 p-2 rounded-full mt-4 m-auto gap-10 justify-center">
     <div style={clickdDiv==="trending"? {color:"white",fontWeight:"bold",cursor:"pointer"}:{color:"black",cursor:"pointer"}} id="trending" onClick={(e)=>(getFilterData(e.target))}>Trending</div>
     <div style={clickdDiv==="popular"? {color:"white",fontWeight:"bold",cursor:"pointer"}:{color:"black",cursor:"pointer"}} id="popular" onClick={(e)=>(getFilterData(e.target))}>Popular</div>
     <div style={clickdDiv==="toprated"? {color:"white",fontWeight:"bold",cursor:"pointer"}:{color:"black",cursor:"pointer"}} id="toprated" onClick={(e)=>(getFilterData(e.target))}>Top Rated</div>
   
    </div>
    {
      movieData &&
      <MovieCard movie={movieData}/>
    }
   
      </>
  );
}

export default App;
