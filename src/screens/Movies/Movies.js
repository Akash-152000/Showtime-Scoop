import React, { useEffect, useState, useContext } from "react";
import fetchApiDataContext from "../../context/FetchApiData/fetchApiDataContext";
import Spinner from "../../components/Spinner/Spinner";
import "./movies.css";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material";
import Generes from "../../components/Genres/Genres";
import Portal from "../../components/Portal/Portal";
import Badge from "@mui/material/Badge";
import axios from "axios";
import favContext from "../../context/Favourites/favContext";
import { useNavigate } from "react-router-dom";
import authContext from "../../context/Authentication/authContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Movies = (props) => {
  let navigate = useNavigate();

  const context = useContext(fetchApiDataContext);
  const {
    movieData,
    setPoster,
    loading,
    setPage,
    showPortal,
    setShowPortal,
    setTitle,
    setDesc,
    setReleaseDate,
    setRating,
    setCast,
    setFavUpdated,
    favUpdated,
    setEleInfo,
    favouriteMovie,
  } = context;

  const authenticationContext = useContext(authContext);
  const { getUser } = authenticationContext;

  const contextFav = useContext(favContext);
  const { getFav, updateFav, removeFav, fav } = contextFav;

  const [invisible, setInvisible] = useState(true);

  const handleClick = async (ele) => {
    const api_key=process.env.REACT_APP_API_KEY
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${ele.id}/credits?api_key=${api_key}&language=en-US`
      )
      .then((response) => {
        const data = response.data;
        setCast(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    setShowPortal(true);
    setPoster(ele.poster_path);

    setDesc(ele.overview);
    setEleInfo(ele.id);

    setRating(ele.vote_average);
    setTitle(ele.title);
    setReleaseDate(ele.release_date);
  };

  const handleFav = (ele) => {
    console.log(fav, fav.includes(ele));

    if (fav.includes(ele)) {
      removeFav(ele);
      setFavUpdated(!favUpdated);
    } else {
      updateFav(ele);
      setFavUpdated(!favUpdated);
    }
  };

  const handleChange = (e) => {
    setPage(e.target.textContent);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // getFav();
      getUser(localStorage.getItem("token"));
      // favouriteMovie()
    } else {
      navigate("/login");
    }
  }, [favUpdated]);

  return (
    <div className="wrapper mt-5 container" style={{ maxWidth: "100vw" }}>
      <Generes name="movie" />
      {loading ? (
        <Spinner />
      ) : window.innerWidth <= 600 ? (
        <div className="row">
          {showPortal && <Portal />}
          {movieData.map((ele) => {
            return (
              <div className="col-6">
                <div
                  className="card mb-3"
                  key={ele.id}
                  style={{
                    display: `${
                      ele.poster_path === null || ele.poster_path === undefined
                        ? "none"
                        : ""
                    }`,
                  }}
                >
                  <Badge
                    badgeContent={ele.vote_average}
                    color={
                      ele.vote_average >= 8
                        ? "success"
                        : ele.vote_average >= 6
                        ? "warning"
                        : "error"
                    }
                    className="badge"
                    // invisible={invisible !== ele.id}
                  >
                    <div
                      className="card-container mb-5"
                      style={{ height: "auto" }}
                    >
                      <img
                        onClick={() => handleClick(ele)}
                        // onMouseEnter={() => setInvisible(ele.id)}
                        // onMouseLeave={() => setInvisible(true)}
                        src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
                        className="card-img-top"
                        alt=""
                      />
                      <div
                        className="card-body text-center text-light"
                        style={{ overflowWrap: "break-word" }}
                      >
                        <p className="text-center" style={{ width: "contain" }}>
                          {ele.title.split(":")[0]}
                        </p>
                      </div>
                    </div>
                  </Badge>
                </div>
              </div>
            );
          })}
          <div className="pagination">
            <ThemeProvider theme={darkTheme}>
              <Pagination
                onChange={(e) => {
                  handleChange(e);
                }}
                count={500}
                size="large"
                hidePrevButton
                hideNextButton
              />
            </ThemeProvider>
          </div>
        </div>
      ) : (
        <div className="row" style={{ marginLeft: 90 }}>
          {showPortal && <Portal />}
          {movieData.map((ele) => {
            return (
             
                <div
                  className="card mb-3"
                  key={ele.id}
                  style={{
                    display: `${
                      ele.poster_path === null || ele.poster_path === undefined
                        ? "none"
                        : ""
                    }`,
                  }}
                >
                  <Badge
                    badgeContent={ele.vote_average}
                    color={
                      ele.vote_average >= 8
                        ? "success"
                        : ele.vote_average >= 6
                        ? "warning"
                        : "error"
                    }
                    className="badge"
                    // invisible={invisible !== ele.id}
                  >
                    <div
                      className="d-flex flex-column mx-2"
                      style={{ height: "auto" }}
                    >
                      <img
                        onClick={() => handleClick(ele)}
                        src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
                        className="card-img-top"
                        alt=""
                      />
                      <div
                        className="card-body text-center text-light"
                        style={{ overflowWrap: "break-word" }}
                      >
                        <p className="text-center" style={{ width: "contain" }}>
                          {ele.title.split(":")[0]}
                        </p>
                      </div>
                    </div>
                  </Badge>
                </div>
          
            );
          })}
          <div className="pagination">
            <ThemeProvider theme={darkTheme}>
              <Pagination
                onChange={(e) => {
                  handleChange(e);
                }}
                count={500}
                size="large"
                hidePrevButton
                hideNextButton
              />
            </ThemeProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
