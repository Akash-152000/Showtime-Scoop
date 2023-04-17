import React, { useContext, useState } from "react";
import './card.css'
import trendingContext from "../../context/Trending/trendinContext";
import Portal from '../../components/Portal/Portal';

const Card = (props) => {
  const context = useContext(trendingContext)
  const {showPortal,setShowPortal, poster, setPoster} = context
  



  const handleClick =()=>{
    setShowPortal(true)
    setPoster(props.poster)
  }

  return (
    <div>
      {showPortal&& <Portal/>}
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
  );
};

export default Card;


{/* <div className="card-body">
          <h5 className="card-title ">{props.title}</h5>
          <p className="card-text"></p>
          <a href="#" className="btn btn-primary">
          Go somewhere
          </a>
        </div> */}