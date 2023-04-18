import React, { useContext } from "react";
import trendingContext from "../../context/Trending/trendinContext";
import Spinner from "../../components/Spinner/Spinner";
import "./movies.css";
import Pagination from '@mui/material/Pagination';
import Chip from '@mui/material/Chip';
import { ThemeProvider, createTheme } from "@mui/material";
import Generes from "../../components/Genres/Genres";


const darkTheme = createTheme({
  palette:{
    mode:"dark"
  }
})

const Movies = () => {
  const context = useContext(trendingContext);
  const { movieData, loading,setPage } = context;

  return (
    <div className="wrapper mt-5 container" style={{ maxWidth: "100vw" }}>
      <Generes name='movie'/>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row" style={{ marginLeft: 90 }}>
          
          {movieData.map((ele) => {
            return (
              <div className="card mb-3 " key={ele.id} style={{display:`${ele.poster_path===null||ele.poster_path===undefined?"none":""}`}}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
                  className="card-img-top"
                  alt=""
                />
              </div>
            );
          })}
          <div className="pagination">
            <ThemeProvider theme={darkTheme}>
              <Pagination onChange={(e)=>setPage(e.target.textContent)} count={500} size="large" hidePrevButton hideNextButton/>
            </ThemeProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
