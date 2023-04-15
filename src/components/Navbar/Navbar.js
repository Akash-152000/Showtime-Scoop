import React, {useContext} from "react";
import "./navbar.css";
import trendingContext from '../../context/Trending/trendinContext';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const context =  useContext(trendingContext)
    const {searchItem, setSearchItem, search, searchData, setUpdatedSearchItem} = context;

    const navigate = useNavigate();

    const handleSearch= (e)=>{
        setSearchItem(e.target.value)
    }

    const handleClick = (e) =>{
        e.preventDefault()
        search(searchItem)
      
        // const newSearch =searchItem.filter(
        //   (data)=> data.result.poster_path!==null
        // )

        // console.log(newSearch);
        setSearchItem("")
        navigate("/search")
        
    }


  return (

    <div>
      <nav className="navbar navbar-expand-lg bg-*">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            Showtime Scoop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active text-white" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/movies">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/tvshows">TV Shows</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="search"
                value={searchItem}
                id="search"
                onChange={handleSearch}
              />
              <button className="btn btn-outline-light" onClick={handleClick} type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
