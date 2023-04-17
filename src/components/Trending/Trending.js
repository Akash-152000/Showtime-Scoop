import React from 'react'
import './trending.css'
import Card from '../Card/Card'
import Spinner from '../../components/Spinner/Spinner';

const Trending = (props) => {
    const {data, name} = props

  return (
    <>
    {!data.results?<Spinner/>:
        <>
        <h3 className="text-light container mb-3 mt-5">{name}</h3>
        <div className='text-light container d-flex wrapper'>
            {data.results.map((ele,i)=>{
                return(
                    <div className='item' key={i}>
                        <Card index={i} name={name} title={name==="Movies"?ele.title:ele.name} id ={ele.id} poster ={ele.poster_path}/>
                    </div>
                )
            })}

            {}
        
        </div>
        </>
    }
        
    </>
  )
}

export default Trending