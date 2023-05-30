import axios from "axios";

export const postSignUp = async(data)=>{
    return await axios({

    method:"POST",
    url :"https://webla-api.uc.r.appspot.com/api/v1/users/register",
    data  : data,
    params:{},
    headers:{},
    })
 
}

export const postLogin = async(data)=>{
    return await axios({
      method:"POST",
      url: "https://webla-api.uc.r.appspot.com/api/v1/users/login",
      data: data,
      params:{},
      headers:{},
  })
}

export const loadproducts =async(data)=>{
  const token= localStorage.getItem("Ecomm_token");
  return await axios({
      method:"GET",
      url: "https://webla-api.uc.r.appspot.com/api/v1/products",
      headers: {
        "X-Authorization": `Bearer ${token}`
      },
      params:{
          per_page:25,
          pageSize:1
      },
      
})
}

export const addToCart =async(data)=>{
  const token= localStorage.getItem("Ecomm_token");
  const cartId = localStorage.getItem("Ecomm_cartId");
  return await axios({
      method:"POST",
      url: `https://webla-api.uc.r.appspot.com/api/v1/carts/${cartId}`,
      headers: {
        "X-Authorization": `Bearer ${token}`
      },
      data:data
      
})
}

export const cartProducts =async()=>{
  const token= localStorage.getItem("Ecomm_token");
  const cartId = localStorage.getItem("Ecomm_cartId");
  return await axios({
      method:"GET",
      url: `https://webla-api.uc.r.appspot.com/api/v1/carts/${cartId}`,
      headers: {
        "X-Authorization":`Bearer ${token}`
      },
          
})
}

export const Removecart =async()=>{
  const token= localStorage.getItem("Ecomm_token");
  const cartId = localStorage.getItem("Ecomm_cartId");
  const productId=localStorage.getItem("Ecomm_productId");

  return await axios({
      method:"DELETE",
      url: `https://webla-api.uc.r.appspot.com/api/v1/carts/${cartId}/remove/${productId}`,
      headers: {
        "X-Authorization":`Bearer ${token}`
      },
          
})
}
