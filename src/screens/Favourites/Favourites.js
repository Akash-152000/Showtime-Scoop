import { useContext, useEffect } from "react";
import favContext from "../../context/Favourites/favContext";
import fetchApiDataContext from "../../context/FetchApiData/fetchApiDataContext";

const Favourites = () => {


  const contextFav = useContext(favContext);
  const { getFav, updateFav, removeFav, fav } = contextFav;

  const data =()=>{
    
  }

  const context = useContext(fetchApiDataContext);
  const {
    favUpdated,
    favList,
    favouriteMovie
  } = context;



  return (
      <div className="container text-light mt-4">
      <h3>Your favourites</h3>
      {console.log(favList)}
      
    </div>
  );
};

export default Favourites;
