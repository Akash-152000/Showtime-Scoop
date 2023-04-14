import React from "react";

const Card = (props) => {
  return (
    <div>
      {/* style={{"width": "18rem"}} */}
      <div className="card mx-2" style={{ height:"30rem",width: "20rem" }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${props.poster}`}
          className="card-img-top"
          alt="..."
        />
        {/* <div className="card-body">
          <h5 className="card-title ">{props.title}</h5>
          <p className="card-text"></p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
