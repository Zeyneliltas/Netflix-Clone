import React from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTI4YWNmMTNkM2E5NWJhYjNiY2Y3NzRhNDA4OGQ2ZCIsIm5iZiI6MTcyNTMxNDI2NS4wMzE1NjksInN1YiI6IjY2ZDQ4NWFlNjg5Y2Q4MjI3ODE4MDliOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rwyF2wM_e_s-_N17ABSomFH4DYH7XH_14f4p28NyEdI'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])
  



  return (
    <div className='player'>
     <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
     <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}
     title='trailer' frameBorder='0' allowFullScreen></iframe>
     <div className="player-info">
       <p>{apiData.published_at.slice(0,10)}</p>
       <p>{apiData.name}</p>
       <p>{apiData.type}</p>
     </div>
    </div>
  )
}

export default Player