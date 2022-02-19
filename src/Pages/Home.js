import React,{useState,useEffect} from 'react'
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from '../gqlOperations/queries';
import Card from '../Components/Card';
import SearchBar from '../Components/SearchBar';
import Pagination from '../Components/Pagination';


export default function Home() {


  const [pagenum,setpageNumber]=useState(1)

    const {loading,error,data,refetch}=useQuery(GET_ALL_PRODUCTS,{
      variables:{
        "pagination": {
          "page": pagenum,
          "pageSize": 6
        }
      }
    })
    useEffect(()=>{
      if(pagenum!=1)
      {
        refetch()
      }
     
       
    },[pagenum])
    if(loading) return <h1>Loading Guys Please just wait</h1>
    if(data)
    {
      console.log(data)
    }

    const pageUpdate=(page)=>{
      setpageNumber(page)
  }
 
    
    
  
   

  return (
    <div className='container' >
     
     <SearchBar/>
     <div className="homeroot">
         {
             data.products.data.map(({id,attributes})=>{
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
     <Pagination pageCount={data.products.meta.pagination.pageCount}
     
        pageUpdate={pageUpdate}
     />


    </div>
  )
}
