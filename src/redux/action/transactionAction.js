import axios from "axios";

const URL_API_PRODUCT = 'http://localhost:2000/cart'

export const addCart =(data)=>{
    return (dispatch)=>{
        axios.post(`${URL_API_PRODUCT}/buy`, data)
        .then(res=>{
            console.log(data)
        }).catch(err => console.log(err))
    }
}

export const getCart = (data)=>{
    return (dispatch)=>{
        axios.post(`http://localhost:2000/cart/cartPage`,{}, {headers:{'Authorization' : `Bearer ${data}`}})
        .then(res =>{
            console.log(res.data)
            return dispatch({
                type : "GET_CART",
                payload : res.data
            })
        })
        .catch(err =>{
            return console.log(err)
        })
    }
}

export const editProduct =(data)=>{
    return(dispatch)=>{
        const iduser = localStorage.getItem('token')
        axios.post(`${URL_API_PRODUCT}/editProduct`, data, {headers:{'Authorization' :`Bearer ${iduser}`}} )
        .then(res =>{
            console.log(res.data)
            return dispatch({
                type : "GET_CART",
                payload : res.data
            })
        }).catch(err=>{
            return console.log(err)
        })
    }
}

export const deleteProduct =(data)=>{
    return(dispatch)=>{
        const iduser = localStorage.getItem('token')
        axios.post(`${URL_API_PRODUCT}/deleteproduct`, data, {headers:{'Authorization': `Bearer ${iduser}`}})
        .then(res =>{
            return dispatch({
                type : "GET_CART",
                payload : res.data
            })

        })
        .catch(err =>{
            console.log(err)
        })
    }
}

export const onCheckout =(data, email)=>{
    return (dispatch)=>{
        let iduser = localStorage.getItem("token")
        for(let i=0; i<data.length; i++){
            console.log(data[i])
            axios.post(`${URL_API_PRODUCT}/cartToPayment`, {email : email, idcart : data[i].idcart}, {headers:{'Authorization' : `Bearer ${iduser}`}})
            .then(res =>{
                console.log(res.data)
                return dispatch({
                    type : "GET_CART",
                    payload : res.data
                })
            })
            .catch(err =>{
                return console.log(err)
            })
        }
    }
}


export const waitPayment =(iduser1)=>{
    // console.log(iduser)
    return (dispatch)=>{
        let iduser = localStorage.getItem("token")
        axios.post(`${URL_API_PRODUCT}/waitForPayment`,{}, {headers:{'Authorization':`Bearer ${iduser}` }})
        .then(res =>{
            console.log(res.data)
            return dispatch({
                type : "GET_PROCESS_PAYMENT",
                payload : res.data
            })
        }).catch(err=> console.log(err))
    }
}

export const FixPayment =(data)=>{
    return(dispatch)=>{
        let iduser = localStorage.getItem("token")
        axios.post(`${URL_API_PRODUCT}/checkout`, data, {headers:{'Authorization' : `Bearer ${iduser}`}})
        .then(res =>{
            return dispatch({
                type : "GET_PROCESS_PAYMENT",
                payload : res.data
            })
        })
        .catch(err => console.log(err))
    }
}

export const cancelBuy =(data)=>{
    return(dispatch)=>{
        let iduser =localStorage.getItem("token")
        axios.post(`${URL_API_PRODUCT}/cancelpayment`, data, {headers:{'Authorization' : `Bearer ${iduser}`}})
        .then(res =>{
            return dispatch({
                type : "GET_PROCESS_PAYMENT",
                payload : res.data
            })
        })
        .catch(err => console.log(err))
    }
}