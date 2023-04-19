import React, { useState, useContext } from "react";
import trendingContext from "../../context/Trending/trendinContext";
import Spinner from "../../components/Spinner/Spinner";
import "./movies.css";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";
import { ThemeProvider, createTheme } from "@mui/material";
import Generes from "../../components/Genres/Genres";
import Portal from "../../components/Portal/Portal";
import Badge from "@mui/material/Badge";
import axios from 'axios'

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Movies = (props) => {
  const context = useContext(trendingContext);
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
  } = context;

  const [invisible, setInvisible] = useState(true);

  const handleClick = async (ele) => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${ele.id}/credits?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US`
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        setCast(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    setShowPortal(true);
    setPoster(ele.poster_path);

    setDesc(ele.overview);

    setRating(ele.vote_average);
    setTitle(ele.title);
    setReleaseDate(ele.release_date);
  };

  return (
    <div className="wrapper mt-5 container" style={{ maxWidth: "100vw" }}>
      <Generes name="movie" />
      {loading ? (
        <Spinner />
      ) : (
        <div className="row" style={{ marginLeft: 90 }}>
          {showPortal && <Portal />}
          {movieData.map((ele) => {
            return (
              <div
                className="card mb-3 "
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
                  // invisible={}

                  invisible={invisible !== ele.id}
                >
                  <img
                    onClick={() => handleClick(ele)}
                    onMouseEnter={() => setInvisible(ele.id)}
                    onMouseLeave={() => setInvisible(true)}
                    src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
                    className="card-img-top"
                    alt=""
                  />
                </Badge>
              </div>
            );
          })}
          <div className="pagination">
            <ThemeProvider theme={darkTheme}>
              <Pagination
                onChange={(e) => setPage(e.target.textContent)}
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
