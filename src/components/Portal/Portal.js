import React, { useContext, useRef } from "react";
import "./portal.css";
import trendingContext from "../../context/Trending/trendinContext";
import ReactDOM from "react-dom";
import PortalDesc from "./Portalcomponents/PortalDesc";


const Portal = (props) => {
  const context = useContext(trendingContext);
  const { title, desc, releaseDate, rating, setShowPortal, poster, cast } =
    context;

  const closePortal = () => {
    setShowPortal(false);
  };

  let closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};

  document.onkeydown = function (evt) {
    if (evt.key == "Escape") {
      setShowPortal(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-wrapper text-light" onClick={closePortal}></div>
      <div className="portal text-white d-flex">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          className="portal-img-top"
          alt="..."
        />

        <div className="content m-2">
          <h3 className="title text-center">{title}</h3>
          <h5 className="description px-3 pt-3">{desc}</h5>
          <div className="date-rate d-flex justify-content-between px-5 pt-2">
            <h5 className="releaseDate">Release Date: {releaseDate}</h5>
            <h5 className="rating">Rating: {Math.round(rating*10)/10}</h5>
          </div>
          <PortalDesc />
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Portal;
