import axios from "axios";
import React, { useEffect, useState } from "react";


function MovieDetails(props){

    const[deatilsData,setDetailsData]=useState('');
    const [movieIdSel,setMovieIdsel]=useState(props.selMovieId);
    let base_img_url="https://www.themoviedb.org/t/p/w66_and_h66_face";
    console.log(`https://api.themoviedb.org/3/movie/${props.selMovieId}/credits?language=en-US&api_key=c72ff33d0282fe5abd382b77ceaff037`);

    function getCastData()
    {
        const castData= axios.get(`https://api.themoviedb.org/3/movie/${props.selMovieId}/credits?language=en-US&api_key=c72ff33d0282fe5abd382b77ceaff037`)
        .then((res)=>{
            let data=res.data;
            console.log(data);
            setDetailsData(data);
        })  
    }
   
   useEffect(()=>{
    getCastData();
   },[movieIdSel])

    if(deatilsData!=="" && deatilsData.cast.length>0)
    {
        return(
            <>
            <div className="grid grid-cols-5 gap-10 w-11/12 m-auto bg-zinc-800 p-10">
            {
                deatilsData.cast.map((item)=>(
                  (item.profile_path!==null)&& <div key={item.name}>
                        <div className="flex justify-center"  ><img className="rounded-full text-center" alt={item.name} style={{width:"90px",textAlign:"center"}} src={base_img_url+item.profile_path}></img></div>  
                        <div className="text-gray-50 text-center text-lg" >{item.name}</div>
                        <div className="text-gray-50 text-center text-xs" >{item.character}</div>
                         
                      
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
            <div className="text-gray-50 text-center">No data avilable for selected movie</div>
            </>
        );
    }

}

export default MovieDetails;