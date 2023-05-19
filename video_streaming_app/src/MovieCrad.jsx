import React from "react";

function MovieCard(props){
    console.log(props.movie);
    let basaseUrl="https://www.themoviedb.org/t/p/w220_and_h330_face";
    if(props.movie)
    {
        return(
            <>
             <div className="grid grid-cols-4 gap-10 w-11/12 m-auto bg-zinc-800 p-10">
            {
                      
                     props.movie.results.map((item)=>(
                     <div style={{width:"200px"}} key={item.id} className=" text text-neutral-50 rounded-xl">
                        <img style={{width:"200px"}} className="rounded-xl" src={basaseUrl+item.poster_path} alt={item.title}></img>
                        </div>
                     )) 
               
            }
             </div>
           
            
            </>
        );

    }
    
  
}

export default MovieCard;