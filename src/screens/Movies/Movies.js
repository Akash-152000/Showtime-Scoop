import React, { useEffect,useState, useContext } from "react";
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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Movies = (props) => {
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
    favUpdated
  } = context;

  const contextFav = useContext(favContext)
  const {getFav,updateFav, removeFav, fav} = contextFav

  const [invisible, setInvisible] = useState(true);

  const handleClick = async (ele) => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${ele.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
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

    setRating(ele.vote_average);
    setTitle(ele.title);
    setReleaseDate(ele.release_date);
  };


  const handleFav = (ele) => {
    if (fav.includes(ele)) {
      removeFav(ele)
      setFavUpdated(!favUpdated)

    } else {
      updateFav(ele)
      setFavUpdated(!favUpdated)
    }
  };

  useEffect(()=>{
    getFav()
  })

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
                  invisible={invisible !== ele.id}
                >
                  <div className="card-container mb-5" style={{height:"auto"}}>
                    <img
                      onClick={() => handleClick(ele)}
                      onMouseEnter={() => setInvisible(ele.id)}
                      onMouseLeave={() => setInvisible(true)}
                      src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
                      className="card-img-top"
                      alt=""
                    />
                    <div className="card-body text-center text-light">
                      <i
                        className={`${
                          fav.includes(ele.id) ? "fa-solid" : "fa-regular"
                        } fa-heart  fa-lg heart`}
                        onClick={() => handleFav(ele.id)}
                      ></i>
                    </div>
                  </div>
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
