import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useQuery ,useLazyQuery} from "@apollo/client";
import { GET_ALL_PRODUCTS,SEARCH_PRODUCT_BY_NAME } from '../gqlOperations/queries';

export default function SearchBar() {


    const [typing,setTyping]=useState("")
    const [hide,setHide]=useState(true)
    const [getProduct,{loading,error,data}]=useLazyQuery(SEARCH_PRODUCT_BY_NAME,{
        variables:{
            "filters": {
              "Name": {
                "startsWith": typing
              }
            }
          }
    })
   
 
    useEffect(()=>{
        if(typing.length!=0)
        {
            getProduct()
            setHide(false)

        }
        else { setHide(true)
        }
       
    },[typing])

    if(data) {
        console.log(data)
    }

    const handleDelay=(e)=>{
        setTimeout(() => {
            setTyping(e.target.value)
        }, 3000);//3s
        
    }

  return (
    <div className='container'>
        <div className="input-field">
          <input  type="search"
          
          onChange={handleDelay }
          required/>

          <label className="label-icon" ><i className="material-icons">search</i></label>
          <i className="material-icons">close</i>
        </div>

        <div className='beutifysearch' hidden={hide}>
            {
                
                data && 
                data.products.data.map(({id,attributes})=>{
                    return <Link key={id} to={`/product/${id}`}><h6  style={{padding:"15px"}} className='blue white-text'>{attributes.Name}</h6></Link>
                })
            }
           
        </div>
    </div>
  )
}
