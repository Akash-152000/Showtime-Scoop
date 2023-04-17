import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Movies from "./screens/Movies/Movies";
import Tv from "./screens/TV/Tv";
import TrendingState from "./context/Trending/TrendingState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./screens/Search/Search";

function App() {
  return (
    <div className="App">
    <TrendingState>
      <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/> 
            <Route exact path="/movies" element={<Movies/>}/> 
            <Route exact path="/tvshows" element={<Tv/>}/> 
            <Route exact path="/search" element={<Search/>}/> 
          </Routes> 
      </Router>
    </TrendingState>
    </div>
  );
}

export default App;
