import trendingContext from "./trendinContext";
import { useState, useEffect } from "react";
import axios from "axios";

const TrendingState = (props) => {
  const [movies, setMovies] = useState({});
  const [tvShows, setTvShows] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [searchData, setSearchData] = useState({});

  const API_KEY = "c33a3ff17bd8ddd11d6b09f3caaabee8";

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        setTvShows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const search = (searchQuery) => {
    axios
    .get(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}`
      )
      .then((response) => {
        const data = response.data;
        setSearchData({...searchData, data});
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
        searchData,
      }}
    >
      {props.children}
    </trendingContext.Provider>
  );
};

export default TrendingState;
