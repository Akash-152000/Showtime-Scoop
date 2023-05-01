import { useState } from "react";
import favContext from "./favContext";
import axios from "axios";

const FavState = (props) => {
  // const context = useContext()

  const [fav, setFav] = useState([]);
  const [id, setId] = useState();

  const getFav = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/fav/getfav`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    setId(response.data[0]._id);
    setFav(response.data[0].favourite);
  };

  const addFav = async () => {

    await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/fav/addfav`,
      {
        favourite: [],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const updateFav = async (ele) => {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_API}/api/fav/updatefav/${id}`,
      {
        favourite: ele,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const removeFav = async (ele) => {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_API}/api/fav/removefav/${id}`,
      {
        favourite: ele,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
      }
    );
  };

  return (
    <favContext.Provider
      value={{ getFav, addFav, updateFav, removeFav, fav, id, setId }}
    >
      {props.children}
    </favContext.Provider>
  );
};

export default FavState;
