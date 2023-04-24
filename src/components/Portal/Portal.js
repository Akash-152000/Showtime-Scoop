import React, { useContext, useRef } from "react";
import "./portal.css";
import fetchApiDataContext from "../../context/FetchApiData/fetchApiDataContext";
import ReactDOM from "react-dom";
import PortalDesc from "./Portalcomponents/PortalDesc";
import favContext from "../../context/Favourites/favContext";


const Portal = (props) => {
  const context = useContext(fetchApiDataContext);
  const { title, desc, releaseDate, rating, setShowPortal, poster, eleInfo,setFavUpdated,
    favUpdated } =  context;

  const contextFav = useContext(favContext)
  const {updateFav, removeFav, fav} = contextFav

  const closePortal = () => {
    setShowPortal(false);
  };

  let closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};

  document.onkeydown = function (evt) {
    if (evt.key == "Escape") {
      setShowPortal(false);
    }
  };

  const handleFav = (ele) => {
    console.log(fav);
    if (fav.includes(ele)) {
      removeFav(ele)
      setFavUpdated(!favUpdated)

    } else {
      updateFav(ele)
      setFavUpdated(!favUpdated)
    }
  };


  return ReactDOM.createPortal(
    <>
      <div className="modal-wrapper text-light" onClick={closePortal}></div>
      <div className="portal text-white d-flex pe-3">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          className="portal-img-top"
          alt="..."
        />

        <div className="content text-center m-2">
          <h3 className="title text-center">{title}</h3>
          <h5 className="description px-3 pt-3">{desc}</h5>
          <div className="date-rate d-flex justify-content-between px-5 pt-2">
            <h5 className="releaseDate">Release Date: {releaseDate}</h5>
            <h5 className="rating">Rating: {Math.round(rating*10)/10}</h5>
          </div>
          <PortalDesc />
        <i className={`${fav.includes(eleInfo)?"fa-solid":"fa-regular"} fa-heart fa-2xl heart` } style={{marginTop:40,cursor:"pointer"}} onClick={()=>handleFav(eleInfo)}></i>
        </div>
        <h5 onClick={closePortal} className="close" >X</h5>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Portal;
