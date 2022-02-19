import React from 'react'

export default function Pagination({pageCount,pageUpdate}) {
  return (
    <div className='container pages' >
        
       {
             [...Array(pageCount).keys()].map((value)=>{
                 return <button className='btn chip '
                 
                 onClick={()=>pageUpdate(value+1)}
                 
                 >{value+1}</button> 
             })
       }
        
            
        
       
    </div>
  )
}
