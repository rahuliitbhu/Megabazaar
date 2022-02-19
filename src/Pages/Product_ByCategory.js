import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import Card from '../Components/Card'
import { GET_ALL_PRODUCTS, GET_CATEGORY_BY_ID, GET_PRODUCT_BY_ID } from '../gqlOperations/queries'

export default function Product_ByCategory() {
    const {catid}=useParams()
    const {loading,error,data}=useQuery(GET_CATEGORY_BY_ID,{
        variables:{
            categoryId:catid
        }
    })
    if(loading) return <h1>Loading...</h1>
    
  return (
    <div className='container' >
     
     <div className="homeroot">
         {
              data.category.data.attributes.products.data.map(({id,attributes})=>{
               
                     return <Card
                     key={id}
                     id={id}
                     name={attributes.Name}
                     price={attributes.Price}
                     img={attributes.Images.data[0].attributes.url}
                     discription={attributes.Discription}
                     />

                 
                     
             })
         }
     </div>


    </div>
  )
}
