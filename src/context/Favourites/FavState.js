import { useContext } from "react";
import favContext from "./favContext";

const FavState = (props) => {
  const addFav = () => {
    const response = axios.get("http://localhost:5000/api/fav/addfav",
    {
        data:{
            favourite:[]
        }
    }, {
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MzhmNzQ2ZTUxYjMzNjhjMTE0MDA2In0sImlhdCI6MTY4MjE0OTIzNn0.ZyaYmtgZdU6P9suWE5QkT61KD4jh0SySezl6JZIwG00",
      },
    });
  };

  return (
    <favContext.Provider value={{ addFav }}>
      {props.children}
    </favContext.Provider>
  );
};

export default FavState;
