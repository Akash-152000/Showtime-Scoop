import React, {useContext, useRef} from 'react'
import './portal.css'
import trendingContext from '../../context/Trending/trendinContext';
import ReactDOM from 'react-dom'

const Portal = (props) => {

  const context =  useContext(trendingContext)
  const {showPortal,setShowPortal,poster} = context;

  return  ReactDOM.createPortal(
    <>
    <div className='modal-wrapper text-light' onClick={()=>setShowPortal(false)}></div>
    <div className='portal text-white'>
    <img 
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          className="portal-img-top"
          alt="..."
          />
    </div>
    </>
    ,
    document.getElementById("portal") 
  )
}

export default Portal;
