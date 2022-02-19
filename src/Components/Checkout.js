import React, { useState } from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useCart } from 'react-use-cart';
import { URL_COMPLETER } from '../URL_Helper';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51KTUccSJ2zFt2qTkt8pJLbKUpb81n9NBw7to2rra0duEQFefj7K0cLKDQTRm3jQZwSeTT4Tj3uQO8XXCOgVA7VhE00D7DXQbR6');





 function CheckoutForm() {
    const stripe = useStripe();
    const navigate=useNavigate()
    const elements = useElements();
    const {cartTotal,items,emptyCart}=useCart()

   // city,state,pin,ShippingAddress,amount,token
    const [formData,setformData]=useState({})
    
    const[cardFill,setcardFill]=useState(false)
    const[error,setError]=useState(false)
    const[done,setDone]=useState(false)
    const[paymentProcess,setpaymentProcess]=useState(false)
   
    

    const handleForm=(e)=>{
        setformData({
            ...formData,
            [e.target.name]:e.target.value

        })
    }

    const makePayment= async (allformData)=>{

        try{
            console.log(URL_COMPLETER)
            const res = await  fetch(`${URL_COMPLETER}/api/orders`,{
                method: "post", 
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+localStorage.getItem("jwt")
                  
                },
                
                 body: JSON.stringify(allformData) 
                 
              });
             // console.log("ups here is problem",res.status)
              
              return await res.json()
        }catch(err){
           
           // console.log('payment failed')
            setError(true)
           
        }
              }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (elements == null) {
          return;
        }
        const cardElement=elements.getElement(CardElement)
       
        const source=await stripe.createSource(cardElement)
          
       const allFormData={
        ...formData,
        token:source.id,
        amount:cartTotal,
        items:items }
        
        //console.log(allFormData)
        //console.log(source)
        setpaymentProcess(true)
         
        await makePayment(allFormData)
        setDone(true)

        setpaymentProcess(false)
        emptyCart()
       
     
       
      }
     
      if(error) return <h1 className='red-text'>Payment failed</h1>
      if(done) return <h1 className='green-text'>Payment Successful</h1>
    

     if(paymentProcess) return <h1>Payment is Processing... Wait</h1>

      

  return (
    <form onSubmit={handleSubmit}>
     
        <input
        type="text"
        name='city'
        placeholder='city'
        onChange={handleForm}
        required
        />
        <input
        type="text"
        name='state'
        placeholder='state'
        onChange={handleForm}
        required
        />
        <input
        type="number"
        name='pin'
        placeholder='pin'
        onChange={handleForm}
        required
        />
        <input
        type="text"
        name='ShippingAddress'
        placeholder='Address'
        onChange={handleForm}
        required
        />
        
        <CardElement onChange={({complete})=>setcardFill(complete)}/>
        <br/>
        
        {
         <button className='blue btn' type="submit" disabled={(!stripe || !elements) && cardFill} >
        Pay
        </button>
        
         }
        
    </form>
  )
}


const Checkout=()=>{
    return (
        <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
    )
}

export default Checkout