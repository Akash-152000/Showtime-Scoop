import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Movies from "./screens/Movies/Movies";
import Tv from "./screens/TV/Tv";
import FetchApiDataState from "./context/FetchApiData/FetchApiDataState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./screens/Search/Search";
import AuthState from "./context/Authentication/AuthState";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import FavState from "./context/Favourites/FavState";
import Favourites from "./screens/Favourites/Favourites";

function App() {

  

  return (
    <div className="App">
      <Router>
          <FavState>
        <FetchApiDataState>
            <AuthState>
              <Navbar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/movies" element={<Movies />} />
                <Route exact path="/tvshows" element={<Tv />} />
                <Route exact path="/search" element={<Search />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/favourites" element={<Favourites/>} />

              </Routes>
            </AuthState>
        </FetchApiDataState>
          </FavState>
      </Router>
    </div>
  );
}

export default App;
