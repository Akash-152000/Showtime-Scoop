import { useNavigate } from "react-router-dom";
import authContext from "./authContext";
import axios from "axios";

const AuthState = (props) => {
    let navigate = useNavigate();

  const login = async (credentials) => {

      const response = await axios.post(
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
      .catch((error)=>{
        console.log(error.response.data);
      })
      
      console.log(response.data);
      if(response.data.success){
        localStorage.setItem('token',response.data.authtoken)
        navigate("/")
      }
      return response
    
  };

  const signup = async (credentials) => {
      const response = await axios.post(
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
      .catch((error)=>{
        console.log(error.response.data);
      })
      
      console.log(response.data);
      if(response.data.success){
        localStorage.setItem('token',response.data.authtoken)
        navigate("/")
      }
      return response
    
  };

  return (
    <authContext.Provider value={{ login, signup }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
