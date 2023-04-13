import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import TrendingState from "./context/Trending/TrendingState";

function App() {
  return (
    <TrendingState>
      <div className="App">
        <Navbar />
        <Home />
      </div>
    </TrendingState>
  );
}

export default App;
