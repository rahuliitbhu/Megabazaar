import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN_USER, SIGNUP_USER } from '../gqlOperations/mutation'

export default function Signup() {
  const navigate=useNavigate()
  const [formData,setFormData]=useState({})

  const [loginUser,{loading,error,data}]=useMutation(SIGNUP_USER)
  if(loading) return  <h1>Please Wait</h1>
  if(data) 
  {
    localStorage.setItem("jwt",data.register.jwt)
    navigate("/")
    
  }


  const handel =(e)=>{
         
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,

    })

  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    loginUser({
      variables:{
        input:formData
      }
    })

    
  }
  return (
    <div className='container' style={{maxWidth:"400px"}}>
      {
        error &&
        <div className='card-panel red'>{error.message}</div>
      }
      <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div class="row">
        <div class="input-field col s12">
          <input placeholder='Name'
          name='username'
          id="text" type="text" class="validate"
          onChange={handel}
          required
          />
          
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input placeholder='email'
          name='email'
          id="email" type="email" class="validate"
          onChange={handel}
          required
          />
          
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input placeholder='password'
          name='password' id="password" type="password" class="validate"
          onChange={handel}
          required
          />
        
        </div>
      </div>
      <button className='btn blue' >Signup</button>
      </form>
      
      
      
      
      </div>
  )
}
