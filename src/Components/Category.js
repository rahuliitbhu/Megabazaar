import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { GET_CATEGORY } from '../gqlOperations/queries'

export default function Category() {

    const {loading,error,data}=useQuery(GET_CATEGORY)

    if(loading) return <h1>Categories are loading...</h1>
  return (
    <div className='category'>
        {
                data.categories.data.map(({id,attributes})=>{
                    return <Link key={id} to={`/productbycategory/${id}`} >{<h3 className='chip btn white'>{attributes.Name}</h3>}</Link>
                }

                )

        }
        
          
    </div>
  )
}
