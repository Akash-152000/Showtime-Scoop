import React, { useContext } from "react";
import "./navbar.css";
import fetchApiDataContext from "../../context/FetchApiData/fetchApiDataContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const Navbar = () => {
  let location = useLocation();

  const context = useContext(fetchApiDataContext);
  const { searchItem, setSearchItem, search, userName} = context;

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
  };



  const handleClick = (e) => {
    e.preventDefault();
    if (searchItem === "") {
    } else {
      search(searchItem);
      setSearchItem("");
      navigate("/search");
    }
  };

  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate("/login")
  }


  return (
    <div>
      <nav className="navbar text-white navbar-expand-lg bg-* pt-3">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            Showtime Scoop
          </Link>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars" aria-hidden="true" style={{"color":"#e6e6ff"}}></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "text-primary" : "text-white"
                  } `}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/movies"
                      ? "text-primary"
                      : "text-white"
                  }`}
                  to="/movies"
                >
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/tvshows"
                      ? "text-primary"
                      : "text-white"
                  }`}
                  to="/tvshows"
                >
                  TV Shows
                </Link>
              </li>
            </ul>
            {localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  value={searchItem}
                  id="search"
                  required
                  onChange={handleSearch}
                />
                <button
                  className="btn btn-outline-light"
                  onClick={handleClick}
                  type="submit"
                >
                  Search
                </button>

                <Avatar className="btn btn-secondary "
                    type="button"
                    id="dropdownMenuButton2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  sx={{ bgcolor: deepOrange[500] }}
                  style={{ cursor: "pointer", marginRight:5, marginLeft:20, border:"none", background:"#ff5722" }}
                >
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
                <div className="dropdown">
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="dropdownMenuButton2"
                    style={{ marginLeft: -155 }}
                  ><li style={{paddingLeft:15}}>
                    <p>Signed in as <br />{userName}</p>
                  </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/favourites">
                        Your Favourites 
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <p className="dropdown-item" onClick={handleLogout} >
                        Logout{" "}
                        <i className="fa-solid fa-right-from-bracket"></i>
                      </p>
                    </li>
                  </ul>
                </div>
              </form>
            ) : (
              <>
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="signup"
                  role="button"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
