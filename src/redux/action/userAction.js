import axios from "axios"

// const URL_API_USER = 'http://localhost:2000/users'
const URL_API_USER = 'https://shoes-ecommerce-api.herokuapp.com/user'


export const onLogin =(data)=>{
    return(dispatch)=>{
        axios.post(`https://cors-anywhere.herokuapp.com/${URL_API_USER}/login`, data)
        .then(res =>{
            console.log(res.data)
            localStorage.setItem("token", res.data.token)
            return dispatch({
                type : "LOGIN",
                payload : res.data.dataUser
            })
        })
        .catch(err => console.log(err))
    }
}


export const keepLogin =(iduser)=>{
    return (dispatch)=>{
        axios.post(`https://cors-anywhere.herokuapp.com/${URL_API_USER}/keeplogin`, {}, {headers:{'Authorization' : `Bearer ${iduser}`}})
        .then(res =>{
            return dispatch({
                type : "LOGIN",
                payload : res.data[0]
            })
        })
    }
} 

export const logout =()=>{
    return(dispatch)=>{
        localStorage.removeItem("token")
        return dispatch({
            type : "LOGOUT"

        })
    }

}