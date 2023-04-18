import React, { useContext, useState } from "react";
import './card.css'
import trendingContext from "../../context/Trending/trendinContext";
import Badge from '@mui/material/Badge';


const Card = (props) => {
  const context = useContext(trendingContext)
  const {setShowPortal, setPoster, setTitle, setDesc, setReleaseDate, setRating} = context


  const handleClick =()=>{
    setShowPortal(true)
    setPoster(props.poster)
    
    setDesc(props.ele.overview)
    
    setRating(props.ele.vote_average)

    if(props.name==='Movies'){
      setTitle(props.ele.title)
      setReleaseDate(props.ele.release_date)
    }
    else{
      setTitle(props.ele.name
        )
      setReleaseDate(props.ele.first_air_date)
    }

  }

  return (
      <Badge badgeContent={4} color="primary">
      <div>
      
        <div className="card ">
          {props.poster?
          <img  onClick={handleClick}
          src={`https://image.tmdb.org/t/p/w500${props.poster}`}
          className="card-img-top"
          alt=""
          />
          
          :<div>
            
            </div>
      }
        </div>
    </div>
      </Badge>
  );
};

export default Card;
