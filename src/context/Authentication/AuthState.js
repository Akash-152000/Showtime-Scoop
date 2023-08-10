import { useNavigate } from "react-router-dom";
import authContext from "./authContext";
import axios from "axios";
import { useContext } from "react";
import favContext from "../Favourites/favContext";
import fetchApiDataContext from "../FetchApiData/fetchApiDataContext";

const AuthState = (props) => {
  let navigate = useNavigate();

  const context = useContext(favContext);
  const { addFav } = context;

  const fetchContext = useContext(fetchApiDataContext)
  const {setUserName} = fetchContext

  const login = async (credentials) => {
    
    const response = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/api/auth/login`,
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
        `${process.env.REACT_APP_BACKEND_API}/api/auth/createuser`,
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



  const getUser = async (authtoken) => {
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/auth/getuser`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data);
      });

      if (response) {
        // console.log(response.data.name);
        setUserName(response.data.name)
      }
    
  };

  return (
    <authContext.Provider value={{ login, signup, getUser }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
