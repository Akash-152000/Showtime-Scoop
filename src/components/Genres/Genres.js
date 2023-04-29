import { Chip } from "@mui/material";
import React, { useContext, useEffect } from "react";
import fetchApiDataContext from "../../context/FetchApiData/fetchApiDataContext";
import Spinner from "../Spinner/Spinner";
import { ThemeProvider, createTheme } from "@mui/material"
import axios from 'axios'

const darkTheme = createTheme({
  palette:{
    mode:"dark"
  }
})

const Generes = (props) => {
  const context = useContext(fetchApiDataContext);
  const { genres,setGenres,setPage, selectedGenres, setSelectedGenres, loading} = context;
  


  const handleAdd =(ele)=>{
    setSelectedGenres([...selectedGenres,ele]);
    setGenres(genres.filter((g)=>g.id!==ele.id));
    setPage("1")
    
  }

  const handleDelete=(genre)=>{
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  }


const getGenres=async ()=>{

  await axios
  .get(
    `https://api.themoviedb.org/3/genre/${props.name}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  )
  .then((response) => {
    const data = response.data;
    setGenres(data.genres);
    // setLoading(false)
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
}

  useEffect(()=>{

    getGenres()

    return () => {
      setGenres([]);
      setSelectedGenres([])
    };

  },[])

  return (
    <div>
     
      {
        
        loading?
        <div>
          <Spinner/>
        
        </div>
        :
        <div style={{marginBottom:30}}>
          {/* {console.log(genreForUrl)} */}
          
          {
            selectedGenres.map((ele)=>{
              return (
                <ThemeProvider theme={darkTheme} key={ele.id}>
                  <Chip 
                    label={ele.name}  
                    style={{marginLeft:6,marginBottom:8}}
                    clickable
                    color="primary"
                    key={ele.id}
                    onDelete={()=>handleDelete(ele)}
                  />
                </ThemeProvider>
                  
              )
            })
          
          }
          { 
          
            genres.map((ele)=>{
              return (
                <ThemeProvider theme={darkTheme} key={ele.id}>
                  <Chip 
                    label={ele.name}  
                    style={{marginLeft:6,marginBottom:8}}
                    clickable
                    key={ele}
                    onClick={()=>handleAdd(ele)}
                  />
                  {/* {console.log(ele.id,"kli")} */}
                </ThemeProvider>
                  
              )
            })
          }
        </div>
      }
      
    </div>
  );
};

export default Generes;
