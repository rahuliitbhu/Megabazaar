import React from 'react'
import { Link } from 'react-router-dom'
import { URL_COMPLETER } from '../URL_Helper'


export default function ({id,name,price,discription,img}) {
  return (
    <Link className="card pcard" to={`/product/${id}`}>
    <div >
        <div className="card-image ">
          <img className='imgcss' src={`${img}`}/>
         
        </div>
        <div className="card-content ">
        <span className="card-title truncate">{name}</span>
        <span className="green-text card-title">{price}</span>
          <p className='truncate'>{discription}</p>
        </div>
       
      </div>
    </Link>
    
  )
}
