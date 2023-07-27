import axios from "axios";
import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGrip,faList} from '@fortawesome/free-solid-svg-icons';

function MovieDetails(props){

    const[flag,setflag]=useState(true);
    const[deatilsData,setDetailsData]=useState('');
    const [movieIdSel,setMovieIdsel]=useState(props.selMovieId);
    const[videoPath,setvideopath]=useState('');
    let base_img_url="https://www.themoviedb.org/t/p/w66_and_h66_face";
    // let iframe_src=`https://www.themoviedb.org/video/play?key=${videoPath}`;
    let iframe_src=`https://www.youtube.com/embed/${videoPath}?autoplay=1&mute=1`;
    console.log(`https://api.themoviedb.org/3/movie/${props.selMovieId}/credits?language=en-US&api_key=c72ff33d0282fe5abd382b77ceaff037`);

    async function getCastData()
    {
        const castData=await axios.get(`https://api.themoviedb.org/3/movie/${props.selMovieId}/credits?language=en-US&api_key=c72ff33d0282fe5abd382b77ceaff037`)

        console.log(castData.data);
        setDetailsData(castData.data);

        const video_key=await axios.get(`https://api.themoviedb.org/3/movie/${props.selMovieId}/videos`, {headers:{
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzJmZjMzZDAyODJmZTVhYmQzODJiNzdjZWFmZjAzNyIsInN1YiI6IjY0NWU3ZGFiOTU5MGUzMDEwMTZjMzQwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.09TEi_EkHdrvkhMMXDeRH65wct6uMBmP8MMaw-QVJWI'
          }})
        
         
          video_key.data.results.map((item)=>{
            if(item.type==="Trailer")
            {
                setvideopath(item.key);
            }
          })
          
    }

   
   
   useEffect(()=>{
    getCastData();
   },[movieIdSel])

    if(deatilsData!=="" && deatilsData.cast.length>0)
    {
        return(
            <>
            <div className="m-20 " ><iframe height={600} width="100%" className=" m-auto top-0 left" src={iframe_src} allowFullScreen /></div>
            <div className="text-right text-white"><button className="mr-32" onClick={()=>{if(flag){setflag(false)}else{setflag(true)}}}>{!flag &&<FontAwesomeIcon style={{fontSize:"30px"}} icon={faGrip} />}{flag &&<FontAwesomeIcon style={{fontSize:"30px"}} icon={faList} /> }</button></div>
            <div   className={flag? "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 w-11/12 m-auto bg-zinc-800 p-10":"m-auto gap-10 bg-zinc-800 p-10"}>
            { flag &&
                deatilsData.cast.map((item)=>(
                  (item.profile_path!==null)&& <div key={item.id}>
                        <div>{item.title}</div>
                        <div className="flex justify-center"  ><img className="rounded-full text-center" alt={item.name} style={{width:"90px",textAlign:"center"}} src={base_img_url+item.profile_path}></img></div>  
                        <div className="text-gray-50 text-center text-lg" >{item.name}</div>
                        <div className="text-gray-50 text-center text-s" >{item.character}</div>
                         
                      
                    </div>
                    
                ))
                   
            }
             { !flag && 
                deatilsData.cast.map((item)=>(
                  (item.profile_path!==null)&& <div key={item.id}>
                        <div className="flex justify-start gap-4 md:gap-20 items-center  w-11/10 sm:w-3/5 lg:w-1/2 m-auto md:p-6 p-2">
                        <div>{item.title}</div>
                        <div className="text-left"><img className="rounded-full " alt={item.name} style={{width:"90px"}} src={base_img_url+item.profile_path}></img></div>  
                        <div className="text-gray-50 text-center text-lg" >{item.name}</div>
                        <div className="text-gray-50 text-center text-s" >{item.character}</div>
                         </div>
                      
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