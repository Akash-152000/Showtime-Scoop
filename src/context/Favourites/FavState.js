import { useContext, useState } from "react";
import favContext from "./favContext";
import axios from "axios";

const FavState = (props) => {

    // const context = useContext()

    const [fav, setFav] = useState([])

  const getFav = async () => {
    const response = await axios
      .get("http://localhost:5000/api/fav/getfav", {
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MzhmNzQ2ZTUxYjMzNjhjMTE0MDA2In0sImlhdCI6MTY4MjE0OTIzNn0.ZyaYmtgZdU6P9suWE5QkT61KD4jh0SySezl6JZIwG00",
        },
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    setFav(response.data[0].favourite)

  };

  const addFav = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/fav/addfav",
      {
        data: {
          favourite: [],
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MzhmNzQ2ZTUxYjMzNjhjMTE0MDA2In0sImlhdCI6MTY4MjE0OTIzNn0.ZyaYmtgZdU6P9suWE5QkT61KD4jh0SySezl6JZIwG00",
        },
      }
    );
  };

  const updateFav = async (ele) => {
    const response = await axios.put(
      "http://localhost:5000/api/fav/updatefav/64462440b4c4cfd6f5937e62",
      {
        favourite: ele,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MzhmNzQ2ZTUxYjMzNjhjMTE0MDA2In0sImlhdCI6MTY4MjE0OTIzNn0.ZyaYmtgZdU6P9suWE5QkT61KD4jh0SySezl6JZIwG00",
        },
      }
    );
  };

  const removeFav = async (ele) => {
    const response = await axios.put(
      "http://localhost:5000/api/fav/removefav/64462440b4c4cfd6f5937e62",
      {
        favourite: ele,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MzhmNzQ2ZTUxYjMzNjhjMTE0MDA2In0sImlhdCI6MTY4MjE0OTIzNn0.ZyaYmtgZdU6P9suWE5QkT61KD4jh0SySezl6JZIwG00",
        },
      }
    );
  };

  return (
    <favContext.Provider value={{ getFav ,addFav, updateFav, removeFav, fav }}>
      {props.children}
    </favContext.Provider>
  );
};

export default FavState;
