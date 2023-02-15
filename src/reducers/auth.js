import { SIGNIN_FAILURE, SIGNIN_PROGRESS, SIGNIN_SUCCESS, CURRENT_USER, SIGNIN_NOW } from "../actions/actionTypes";

const initialState = {
    user:{},
    name:false,
    isValid:false,
    proceedSignIn: false,
}

export default function auth(state = initialState, action){
    switch(action.type){
        case SIGNIN_PROGRESS:
            return{
                ...state,
                name:!action.isVerified,
            }
        case SIGNIN_SUCCESS:
            return {
                ...state,
                user:action.payload,
                name:false,
                isValid:false,
            }
        case SIGNIN_FAILURE:
            return {
                ...state,
                isValid:true,
            }
        case CURRENT_USER:
            return {
                ...state,
                user: action.payload,
            }
        case SIGNIN_NOW: 
            return {
                ...state,
                proceedSignIn: true,
            }
        default:
            return state;
    }
}