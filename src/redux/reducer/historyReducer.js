const INITIAL_STATE ={
    history : [],
    payment : []
}

const historyReducer =(state=INITIAL_STATE, action)=>{
    switch (action.type){
        case "GET_HISTORY" :
            return {
                ...state,
                history : action.payload
            }
        case "GET_PROCESS_PAYMENT" :
            return {
                ...state,
                payment : action.payload
            }
        default :
            return state
    }
}

export default historyReducer