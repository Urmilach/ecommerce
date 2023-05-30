import { useEffect,useState } from "react";
import { loadproducts } from "./ecomapp";
import { toast } from "react-toastify";
import { addToCart } from "./ecomapp";


const Dashboard=()=>{
const [products,setProducts]=useState([]);

const onFinalSubmission=async()=>{
    try{
        const response= await loadproducts();
       setProducts(response.data);
        /*console.log(response.data);*/
}

    catch(error) {
        /* console.log(error);*/
          }
}

    useEffect (()=>{
        onFinalSubmission();},[])

    const handleLogout=()=>{
        localStorage.clear();
        window.location.href="/login";
    }
    const handlecart=()=>{
    window.location.href="/cart";
 } 

return(
    <>
    <h1>products</h1>
        <button className="btn btn-primary" onClick={()=>{handleLogout()}}>Logout</button>
        <button className="btn btn-primary" onClick={()=>{handlecart()}}>Cart</button>
    {
        <div className="Productpage" style={{display:"flex",flexWrap:"wrap",padding:"10px",margin:2}}>

 {
    products.map((product,index)=>{
        const addItem =async()=>{
        try{
            const response=await addToCart({
               "id"   :`${product.id}`,
               "title":`${product.title}`,
               "price":`${product.price}`,
               "quantity":1
            
       }); console.log(response);
            toast("product sucessfully added to cart",{
                position:"top-center",
                type:"success",
                theme: "colored"
            }
           )}
          catch(error){
            toast(error,{
                position:"top-center",
                type:"error",
                theme: "colored"
            }) 
          }
    }
     return(
            
           <>
           <div className="card" style={{width: "18rem"}}key={index+100}>
     <img src={product.images[0]} className="card-img-top" alt="product image" style={{height:250}}/>
    <div className="card-body">
    <h5 className="card-title"style={{height:60}}>{product.title}</h5>
    <h3 className="card-title">Price:${product.price}</h3>
    <p className="card-text" style={{height:130}}>{product.description}</p>
    <a href="#" className="btn btn-primary" onClick={()=>{addItem()}}>Add cart</a>


    </div>
    </div>
           {
           
           /* <div className="card" style={{color:"black",width:"20rem",margin:4,display:"flex",minHeight:"100"}} >
   <a href= {product.url} target="_blank"><img src= {product.images[0]} className="card-img-top" alt="card-img-top" style={{width:200,margin:4,minHeight:100}}/></a>
   <div className="card-body">
     <h5 className="card-title">{product.title}</h5>
     <p className="card-text1">price:{product.price}</p>
    <div className="card-text" style={{width:300,minHeight:150}}>{product.description}</div>
     
     </div>
</div>
  */}
           </>
        )
}
    )}
 </div>
}
</>
)
}

export default Dashboard;