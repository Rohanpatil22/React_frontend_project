import React, { useState } from "react";
import MovieDetails from "./details";


function MovieCard(props){
    console.log(props.movie);
    let basaseUrl="https://www.themoviedb.org/t/p/w220_and_h330_face";
    const [movieId,setMovieId]=useState("");


    if(props.movie && movieId==="" )
    {
        return(
            <>
            
             <div className="grid grid-cols-4 gap-10 w-11/12 m-auto bg-zinc-800 p-10">
            {
                      
                     props.movie.results.map((item)=>(
                     <div onClick={()=>(setMovieId(item.id))} style={{width:"200px"}} key={item.id} className=" text text-neutral-50 rounded-xl">
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
                <div className="text-right mr-10"><button onClick={()=>{setMovieId("")}} className="bg-red-500 p-2 w-28 rounded-xl text-neutral-50">Back</button></div>
                <MovieDetails selMovieId={movieId}/>
            </>
        );
        
    }
    
  
}

export default MovieCard;