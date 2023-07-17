import React, { useState } from "react";
import MovieDetails from "./details";


function MovieCard(props){
    console.log(props.movie);
    let basaseUrl="https://www.themoviedb.org/t/p/w220_and_h330_face";
    const [movieId,setMovieId]=useState("");
    const[selMovieName,setSelMovie]=useState();


    if(props.movie && movieId==="" )
    {
        return(
            <>
            
             <div className="grid grid-cols-4 gap-10 w-11/12 m-auto bg-zinc-800 p-10">
            {
                      
                     props.movie.results.map((item)=>(
                     <div onClick={()=>{setMovieId(item.id);props.selMovie(true);setSelMovie(item)}} style={{width:"200px"}} key={item.id} className=" text text-neutral-50 rounded-xl">
                        <img style={{width:"200px"}} className="rounded-xl" src={basaseUrl+item.poster_path} alt={item.title}></img>
                        </div>
                     )) 
               
            }
             </div>
           
            
            </>
        );

    }
    else{
        return(
            <>
                <div className="text-right mr-10 mt-10"><button onClick={()=>{setMovieId("");props.selMovie(false)}} className="bg-red-500 p-2 w-28 rounded-xl text-neutral-50">Back</button></div>
                <div className="w-1/2 m-auto text-center mt-6 mb-6 text-4xl font-bold text-amber-200 ">{selMovieName.title}</div>
                <div className="flex justify-center m-auto w-4/5 gap-8 text-neutral-50 items-center text-lg">
                    <div><img src={basaseUrl+selMovieName.poster_path}></img></div>
                    <div className="w-3/5">
                         <div className="m-2"><span className="text-amber-200 font-bold">Language :</span> {selMovieName.original_language.toUpperCase()}</div>
                        <div className="m-2"><span className="text-amber-200 font-bold">Overview :</span> {selMovieName.overview}</div>
                        <div className="m-2"><span className="text-amber-200 font-bold">Popularity :</span> {selMovieName.popularity}</div>
                        <div className="m-2"><span className="text-amber-200 font-bold">Rating :</span> {selMovieName.vote_average}</div>
                        <div className="m-2"><span className="text-amber-200 font-bold">Release Date :</span> {selMovieName.release_date}</div>
                    </div>
                    
                </div>
                <MovieDetails selMovieId={movieId}/>
            </>
        );
        
    }
    
  
}

export default MovieCard;