import React, { useContext, useEffect, useState } from "react";
import "./card.css";
import fetchApiDataContext from "../../context/FetchApiData/fetchApiDataContext";
import Badge from "@mui/material/Badge";
import axios from "axios";
import favContext from "../../context/Favourites/favContext";

const Card = (props) => {
  const context = useContext(fetchApiDataContext);
  const {
    setShowPortal,
    setPoster,
    setTitle,
    setDesc,
    setReleaseDate,
    setRating,
    setCast,
    setEleInfo,
    setFavUpdated,
    favUpdated,
  } = context;

  const contextFav = useContext(favContext);
  const { updateFav, getFav, removeFav, fav } = contextFav;

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
    setEleInfo(props.ele.id);

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

  // const handleFav = (ele) => {
  //   console.log(fav,fav.includes(ele), favUpdated);
  //   if (fav.includes(ele)) {
  //     removeFav(ele)
  //     setFavUpdated(!favUpdated)
  //     console.log('remove',!favUpdated);

  //   } else {
  //     updateFav(ele)
  //     setFavUpdated(!favUpdated)
  //     console.log('update',!favUpdated);
  //   }
  // };

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
      >
        {props.poster ? (
          <div className="d-flex flex-column mx-2">
            {/* {console.log(ele)} */}
            <img
              onClick={handleClick}
              src={`https://image.tmdb.org/t/p/w500${props.poster}`}
              className="card-img-top"
              alt=""
            />
            <div className="card-body text-center text-light">
              <p>
                {props.name === "Movies"
                  ? props.ele.title.split(":")[0]
                  : props.ele.name.split(":")[0]}
              </p>
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
