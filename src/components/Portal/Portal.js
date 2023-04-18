import React, { useContext, useRef } from "react";
import "./portal.css";
import trendingContext from "../../context/Trending/trendinContext";
import ReactDOM from "react-dom";

const Portal = (props) => {
  const context = useContext(trendingContext);
  const { title, desc, releaseDate, rating, setShowPortal, poster } = context;

  return ReactDOM.createPortal(
    <>
      <div
        className="modal-wrapper text-light"
        onClick={() => setShowPortal(false)}
      ></div>
      <div className="portal text-white d-flex">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            className="portal-img-top"
            alt="..."
          />

        <div className="content">
          <h3 className="title">{title}</h3>
          <h5 className="description">{desc}</h5>
          <h5 className="releaseDate">{releaseDate}</h5>
          <h5 className="rating">{rating}</h5>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Portal;
