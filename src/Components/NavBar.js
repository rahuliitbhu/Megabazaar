import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate=useNavigate()
  const jwt=localStorage.getItem('jwt')
  const handleLogout=()=>{
    localStorage.removeItem('jwt')
    navigate("/login")
  }
  return (
    

<nav>
    <div className="nav-wrapper #e65100 orange darken-4">
      <Link to="/" className="brand-logo">MegaBazaar</Link>
      <ul id="nav-mobile" className="right">
        {
          jwt? <>
          <li>
            <Link to="/cart" >
             {
               <i style={{padding:"0 30px"}} className="material-icons medium #0d47a1 blue darken-4">add_shopping_cart</i>
             }
            </Link >
          
          </li>
          <li>
            <a>
               {
                 <i style={{padding:"0 30px"}} className="material-icons medium red" onClick={handleLogout}>logout</i>
               }
            </a>
          
          </li>
          
          </>:
          <>
            <li>
            <Link to="/cart" >
             
               <i style={{padding:"0 30px"}} className="material-icons medium #0d47a1 blue darken-4">add_shopping_cart</i>
             
            </Link >
          
          </li>
           <li><Link to="/login" >Login</Link></li>
           <li><Link to="/signup" >Signup</Link></li>
          </>
      
        }

      </ul>
    </div>
  </nav>



  )
}

export default NavBar