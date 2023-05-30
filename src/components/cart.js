import { cartProducts,Removecart } from "./ecomapp";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";


const Cart=()=>{
    const [productCart,setProductCart]=useState([]);
    const onFinalSubmission=async(data)=>{
        try{
            const response=await cartProducts();
                setProductCart(response.data)
        }
        catch(error){

        }}

        const Removefromcart=async(data)=>{
            try{
              const response=await Removecart();
              toast("Remove Item Sucessfully",{
              position:"top-center",
              type:"success",
              theme: "colored"
           })
        }
          catch(error){
          toast("error",{
              position:"top-center",
              type:"error",
              theme: "colored"
              })
        }}
    
        useEffect (()=>{
            onFinalSubmission();},[])

            const handledashboard=()=>{
                window.location.href="/dashboard";
            }

        return(
            <>
            <button className="btn btn-primary" onClick={()=>{handledashboard()}}>dashboard</button>
            <h1>cartItems</h1>
        {
       productCart.map((Items,index)=>{

        const handleRemove=()=>{
            const productId=Items?.id;
            localStorage.setItem("Ecomm_productId",productId);
            Removefromcart();
        }
        if(index=null){
            window.location.href="/dashboard"
        }{
        window.location.href="/cart"
        }
return(
      <>
      <div className="card"style={{widtht:"18rem"}} key={index}>
        <div className="card-body">
    <h5 className="card-title"style={{height:40}}>{Items.title}</h5>
    <h3 className="card-title">Price:${Items.price}</h3>
    <a href="#" className="btn btn-primary" onClick={()=>{handleRemove()}}>Remove Item</a>
    </div>
    </div>

      </>

        )
            
        })}
            </>
        )
    
}
export default Cart;