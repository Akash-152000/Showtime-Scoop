import trendingContext from "./trendinContext";
import { useState, useEffect } from "react";
import axios from "axios";

const TrendingState = (props) => {
  const [movies, setMovies] = useState({}); ////// To store trending movies data
  const [tvShows, setTvShows] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [searchMovieData, setSearchMovieData] = useState({});
  const [searchTvData, setSearchTvData] = useState({});
  const [updatedSearchItem, setUpdatedSearchItem] = useState("");
  const [showPortal, setShowPortal] = useState(false);
  const [poster, setPoster] = useState("");

  const [movieData, setMovieData] = useState([]); ///////// To store Movies data in /movies route

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        const data = response.data;
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        const data = response.data;
        setTvShows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });


      axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
      )
      .then((response) => {
        const data = response.data;
        setMovieData(data);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, []);

  const search = (searchQuery) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchQuery}`
      )
      .then((response) => {
        const data = response.data;
        setSearchMovieData({ ...searchMovieData, data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchQuery}`
      )
      .then((response) => {
        const data = response.data;
        setSearchTvData({ ...searchTvData, data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    };

    
  

  return (
    <trendingContext.Provider
      value={{
        movies,
        tvShows,
        loading,
        searchItem,
        setSearchItem,
        search,
        searchMovieData,
        searchTvData,
        setUpdatedSearchItem,
        showPortal,
        setShowPortal,
        poster,
        setPoster,
        movieData,
      }}
    >
      {props.children}
    </trendingContext.Provider>
  );
};

export default TrendingState;
