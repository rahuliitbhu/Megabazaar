import React,{useState} from 'react'
import { useCart } from 'react-use-cart'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Checkout from './Checkout'
export default function Cart() {

      const [checkout,setcheckout]=useState(false)
    const {isEmpty,items,cartTotal,removeItem}=useCart()
    if(isEmpty) return <h1>Your Cart is Empty</h1>
     
    const jwt=localStorage.getItem('jwt')

    if(checkout)
    {
      return (
      <div className='container'>
            <Checkout/>
            <button className='btn red' onClick={()=>setcheckout(false)}>Cancel</button>

      </div>)
    }

  return (
    <div>
        <div className='container row'>
        <ul className="collection col m8">
       {

         items.map(({id,price,itemTotal,img,quantity,name})=>{
           return <div>
          
          <li className="collection-item avatar">
            <img src={`${img}`}  className="circle" />
            <span className="title truncate">{name}</span>
            <p className='green-text'> Price: Rs. {quantity} x {price} = {itemTotal}</p>
            

              
            
            <i onClick={()=>removeItem(id)} className=" secondary-content material-icons red-text">remove_circle</i>
          </li>
        
          </div>
      
         })
       }
        </ul>
        <div className='col center m3 offset-m1' style={{position:"sticky",top:"10px"}}>
        <i  className=" large material-icons red-text"> shopping_cart</i>
       
          <h5>Total Amount</h5>
          <h5 className='green-text'>Rs. {cartTotal}</h5>
       
        
          {
            jwt?<button className='btn #7e57c2 deep-purple lighten-1' onClick={()=>setcheckout(true)}>checkout</button>:
            <div className='card-panel green '>
              <Link  to="/login"><p className='white-text'>Please Login to Checkout</p></Link>
              </div>
          }
        </div>
        </div>
    </div>
  )
}
