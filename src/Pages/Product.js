import { useQuery } from '@apollo/client';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../Components/Card';
import { GET_PRODUCT_BY_ID } from '../gqlOperations/queries';
import { URL_COMPLETER } from '../URL_Helper';
import Carousel from '@brainhubeu/react-carousel';
import { useCart } from 'react-use-cart';

function Product() {
    const {pid}=useParams()
    const navigate=useNavigate()
    const{addItem}=useCart()
    const {loading,error,data}=useQuery(GET_PRODUCT_BY_ID,{
        variables:{
            productId:pid
        }
    })


    if(loading) return <h1>Loading Please Wait</h1>
   // if(data) console.log(data)
    const {Name,Price,Images,Discription}=data.product.data.attributes
    const addtocart=(e)=>{
        addItem({
            id:pid,
            name:Name,
            price:Price,
            img:Images.data[0].attributes.url
        })

     

    }
  return (
    <div className='container' style={{marginTop:"10px"}}>
        <div className='center '>
        
        <div >
        <Carousel plugins={['arrows']}>
              {  Images.data.map(({attributes})=>
                  {

                   return  <img style={{height:"50vh"}} src={`${attributes.url}`} />
            
            
                   }
                  )
                }
               
            </Carousel>
        </div>
           
       
        
        <div>
           
        <h2>
                {Name}
            </h2>
            <h5 className="green-text" style={{fontWeight:"bold"}}>
                {Price}
            </h5>
            <p >
                {Discription}
            </p>
            <button className='btn blue' onClick={addtocart}>
                Add to cart
            </button>
        </div>
        
        </div>
    </div>
                
  )

}

export default Product