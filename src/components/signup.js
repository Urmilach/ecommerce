import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { postSignUp } from "./ecomapp";


const schema = yup.object({
    username: yup.string().min(5).max(15).required(),
    email: yup.string().max(30).min(8),
    password: yup.string().max(30).min(6),
    confirmPassword: yup.string().max(30).min(6),
  }).required();

 const SignUp=()=>{
 const { register, handleSubmit, watch, formState: { errors } } = 
                                                                  useForm({resolver: yupResolver(schema)});

 const onFinalSubmission=async(data)=>{
    // console.log(data);
   if (data.password!==data.confirmPassword) {
    toast("password is invalid",{
    position:"top-center",
    type:"error",
    theme: "colored"
     })
     return
     }

    try {
       const response = await postSignUp({
       name: data.username,
       email:data.email,
       password:data.password
       });
    // console.log(response);

       if(response.status===200){
        toast("You have signup sucessfully",{
        position:"top-center",
        type:"success",
        theme: "colored"
        })
       }
    setTimeout(()=>{
    window.location.href="/login"
},1000)
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

    /*console.log("errors",errors);
    console.log("watching",watch('username'));*/

    return(

        <div style={{width:500}}>
    <form onSubmit={handleSubmit(onFinalSubmission)}>
        <h2>SignUp</h2>
      <div class="form-group">
            <label >UserName</label><br/>
            <input className="form-control" type="text" {...register("username")} />
            <small className="form-text text-danger">{errors["username"]?.message}</small>
        </div>
        <div class="form-group"> 
            <label >Email</label><br/>
            <input className="form-control" type="Email"{...register("email" )} />
            <small className="form-text text-danger">{errors["email"]?.message}</small>
        </div>
        <div class="form-group">
            <label >password</label><br/>
            <input className="form-control" type="password" {...register("password")} />
            <small className="form-text text-danger">{errors["password"]?.message}</small>
        </div>
        <div class="form-group">
            <label >ConfirmPassword</label><br/>
            <input className="form-control" type="password" {...register("confirmPassword")} />
            <small className="form-text text-danger">{errors["confirmPassword"]?.message}</small>
       </div>
       <input className="btn btn-success" type="Submit" style={{margin:15}}/>
       ? Already have account <a href="/login">Login</a>
    </form>
    </div>
    )
}
export default SignUp;
