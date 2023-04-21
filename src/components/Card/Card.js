import React, { useContext, useState } from "react";
import "./card.css";
import trendingContext from "../../context/Trending/trendinContext";
import Badge from "@mui/material/Badge";
import axios from "axios";

const Card = (props) => {
  const context = useContext(trendingContext);
  const {
    setShowPortal,
    setPoster,
    setTitle,
    setDesc,
    setReleaseDate,
    setRating,
    setCast,
    setFav,
    fav,
    setEleInfo
  } = context;

  const [invisible, setInvisible] = useState(true);

  const handleClick = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/${
          props.name === "Movies" ? "movie" : "tv"
        }/${props.ele.id}/credits?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US`
      )
      .then((response) => {
        const data = response.data;
        setCast(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setShowPortal(true);
    setPoster(props.poster);
    setEleInfo(props.ele)

    setDesc(props.ele.overview);

    setRating(props.ele.vote_average);

    if (props.name === "Movies") {
      setTitle(props.ele.title);
      setReleaseDate(props.ele.release_date);
    } else {
      setTitle(props.ele.name);
      setReleaseDate(props.ele.first_air_date);
    }
  };


  const handleFav =(ele)=>{
    console.log(fav.includes(ele));
    if(fav.includes(ele)){
      setFav(fav.filter((g)=>g.id!==ele.id));
    }
    else{
      setFav([...fav,ele])
    }
  }


  return (
    <div className="card">
        <Badge
          badgeContent={Math.round(props.ele.vote_average * 10) / 10}
          color={
            props.ele.vote_average >= 8
              ? "success"
              : props.ele.vote_average >= 6
              ? "warning"
              : "error"
          }
          invisible={invisible !== props.ele.id}
        >
          {props.poster ? (
            <div className="d-flex flex-column">
              <img
                onClick={handleClick}
                onMouseEnter={() => setInvisible(props.ele.id)}
                onMouseLeave={() => setInvisible(true)}
                src={`https://image.tmdb.org/t/p/w500${props.poster}`}
                className="card-img-top"
                alt=""
              />
              <div className="card-body text-center text-light">
              <i className={`${fav.includes(props.ele)?"fa-solid":"fa-regular"} fa-heart fa-lg heart`} onClick={()=>handleFav(props.ele)}></i>
                {/* <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p> */}
                {/* <a href="#" class="btn btn-primary">
                  Go somewhere
                </a> */}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </Badge>
    </div>
  );
};

export default Card;
