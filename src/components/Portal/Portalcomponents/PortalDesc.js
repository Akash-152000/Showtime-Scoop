import React, { useContext } from "react";
import "./portalDesc.css";
import trendingContext from "../../../context/Trending/trendinContext";

const PortalDesc = () => {
  const context = useContext(trendingContext);
  const { cast } = context;

  return (
    <div>
      <div className="d-flex container desc-wrapper  mt-5">
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
                  <div>
                    <div>
                      <b>{ele.name}</b>
                      <br></br>
                    </div>
                    <h7>{`(${ele.character})`}</h7>
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
