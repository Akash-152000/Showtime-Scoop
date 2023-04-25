import { useNavigate } from "react-router-dom";
import authContext from "./authContext";
import axios from "axios";
import { useContext } from "react";
import favContext from "../Favourites/favContext";

const AuthState = (props) => {
  let navigate = useNavigate();

  const context = useContext(favContext);
  const { addFav } = context;

  const login = async (credentials) => {
    const response = await axios
      .post(
        "http://localhost:5000/api/auth/login",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        console.log(error.response.data);
      });

    if (response.data.success) {
      localStorage.setItem("token", response.data.authtoken);
      navigate("/");
    }
    return response;
  };

  const signup = async (credentials) => {
    const response = await axios
      .post(
        "http://localhost:5000/api/auth/createuser",
        {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        console.log(error.response.data);
      });

    // console.log(response.data);
    if (response.data.success) {
      localStorage.setItem("token", response.data.authtoken);
      addFav();
      navigate("/");
    }
    return response;
  };

  const getUser = async () => {
    const response = await axios
      .get(
        "http://localhost:5000/api/auth/getuser",
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token":`${localStorage.getItem('token')}`,
          },
        }
      )
      .catch((error) => {
        console.log(error.response.data);
      });

    if (response) {
      console.log(response);
    }
    return response;
  };

  return (
    <authContext.Provider value={{ login, signup, getUser }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
