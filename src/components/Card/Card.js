import React, { useContext, useState } from "react";
import "./card.css";
import trendingContext from "../../context/Trending/trendinContext";
import Badge from "@mui/material/Badge";

const Card = (props) => {
  const context = useContext(trendingContext);
  const {
    setShowPortal,
    setPoster,
    setTitle,
    setDesc,
    setReleaseDate,
    setRating,
  } = context;

  const [invisible, setInvisible] = useState(true)

  const handleClick = () => {
    setShowPortal(true);
    setPoster(props.poster);

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

  return (
    <div>
      <div className="card ">
        <Badge
          badgeContent={Math.round(props.ele.vote_average * 10) / 10}
          color={props.ele.vote_average>=8?'success':props.ele.vote_average>=6?'warning':'error'}
          invisible={invisible !== props.ele.id}
        >
          {props.poster ? (
            <img
              onClick={handleClick}
              onMouseEnter={() => setInvisible(props.ele.id)}
              onMouseLeave={() => setInvisible(true)}
              src={`https://image.tmdb.org/t/p/w500${props.poster}`}
              className="card-img-top"
              alt=""
            />
          ) : (
            <div></div>
          )}
        </Badge>
      </div>
    </div>
  );
};

export default Card;
