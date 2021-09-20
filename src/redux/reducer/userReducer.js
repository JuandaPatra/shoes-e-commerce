const INITIAL_STATE ={
    iduser: null,
    email : "",
    password : "",
    username : "",
    cart : []
}

const userReducer =(state=INITIAL_STATE, action)=>{
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                iduser : action.payload.iduser,
                email : action.payload.email,
                password : action.payload.password,
                username : action.payload.username
            }
        case "GET_CART":
            return{
                ...state,
                cart : action.payload.cart
            }
        case "LOGOUT" :
            return INITIAL_STATE
            default:
                return state
    }
}

export default userReducer