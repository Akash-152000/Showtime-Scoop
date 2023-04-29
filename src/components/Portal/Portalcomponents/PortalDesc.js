import React, { useContext } from "react";
import "./portalDesc.css";
import fetchApiDataContext from "../../../context/FetchApiData/fetchApiDataContext";

const PortalDesc = () => {
  const context = useContext(fetchApiDataContext);
  const { cast } = context;

  return (
    <div>
      <div className="d-flex container desc-wrapper  mt-3">
        {cast.cast.map((ele) => {
          return (
            <>
              {ele.profile_path === null ? (
                <></>
              ) : (
                <div key={ele.id} className="desc-card desc-item mt-1">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${ele.profile_path}`}
                    className="desc-card-img-top"
                    alt=""
                  />
                  <div key={ele.id}>
                    <div key={ele.id}>
                      <b>{ele.name}</b>
                      <br></br>
                    </div>
                    <h6>{`(${ele.character})`}</h6>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default PortalDesc;
