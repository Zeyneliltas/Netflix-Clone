import React from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'





const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTI4YWNmMTNkM2E5NWJhYjNiY2Y3NzRhNDA4OGQ2ZCIsIm5iZiI6MTcyNTMxNDI2NS4wMzE1NjksInN1YiI6IjY2ZDQ4NWFlNjg5Y2Q4MjI3ODE4MDliOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rwyF2wM_e_s-_N17ABSomFH4DYH7XH_14f4p28NyEdI'
    }
  };
  
  


const  handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}
useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));


  cardsRef.current.addEventListener('wheel', handleWheel);
},[])
  return (
    <div className='title-cards'>
     <h2>{title?title:"Popular on Netflix"}</h2>
     <div className="card-list" ref={cardsRef}>
       {apiData.map((card,index)=>{
         return <Link to={`/player/${card.id}`} className="card" key={index}>
           <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
           <p>{card.original_title}</p>
         </Link>
       })}
     </div>
    </div>
  )
}

export default TitleCards