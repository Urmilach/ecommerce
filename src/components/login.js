import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { postLogin } from "./ecomapp";
import { toast } from "react-toastify";

const schema = yup.object({
    
    email: yup.string().max(30).min(8).required(),
    password: yup.string().max(10).min(6),
    
  }).required();

const Login=()=>{
    const { register, handleSubmit, watch, formState: { errors } } = useForm({resolver: yupResolver(schema)});

     const onFinalSubmission=async(data)=>{
       try{
           const response= await postLogin({
        
           email   : data.email,
           password : data.password,
        
        });
   console.log("clicked");
    
       const CartID= response?.data?.cart_id;
       const Token= response?.data?.token;

      localStorage.setItem("Ecomm_Cart_Id", CartID)
      localStorage.setItem("Ecomm_token",Token )
      
      toast("login sucessfully!",{
      position:"top-center",
      type:"success",
      theme: "colored"
      })

    setTimeout(()=>{
        window.location.href="/dashboard"},1000)
 } 
     catch(error){
     console.log(error);
    
      const message= error?.response?.data?.message||"something went wrong";
      toast(message,{
      position:"top-center",
      type:"error",
      theme: "colored"
    })
  }
}
console.log("final data");

  console.log("errors",errors);
  console.log("watching",watch("username"));

    return(
        <div style={{width:500}}>
    <form onSubmit={handleSubmit(onFinalSubmission)}>
        <h2>Login</h2>
        <div className="form-group">
            <label >Email</label><br/>
            <input className="form-control" type="text" {...register("email")} />
            <small className="form-text text-danger">{errors["email"]?.message}</small>
        </div>
        <div className="form-group">
            <label >password</label><br/>
            <input className="form-control" type="password" {...register("password")} />
            <small id="emailHelp" className="form-text text-danger">{errors["password"]?.message}</small>
        </div>
    
       <input className="btn btn-success" type="Submit" style={{margin:12}}/>
      
       Don't have an account?<a href="/signup">signup</a>
       
    </form>
    </div>
    )
}
export default Login;
