import { SHOW_FRIENDS, SHOW_USERS, ADD_FRIEND, PRIVATE_MESSAGE, SIGNIN_PROGRESS, SIGNIN_SUCCESS, FRIENDSHIP, SIGNIN_FAILURE, CURRENT_USER, SIGNIN_NOW } from "./actionTypes";
import { APIUrls } from '../helpers/apis';
import { getFormBody } from '../helpers/utils';
import {getAuthTokenFromLocalStorage} from '../helpers/utils';

//related to the users
export function allUsers(data){
    return {
        type:SHOW_USERS,
        payload:data,
    }
}

export function usersFriends(data){
    return {
        type:SHOW_FRIENDS,
        payload:data
    }
}

export function show_friends(){
    return (dispatch) => {
        const url = APIUrls.friends();
        fetch(url, {
            method:'GET',
            mode:"cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
        })
        .then((response) => response.json())
        .then(data => {
            dispatch(usersFriends(data.data.friends.friends));
        })
        .catch(error => console.log("error", error));
    }
}

export function show_users(){
    return (dispatch) => {
        const url = APIUrls.users();
        fetch(url, {
            method:'GET',
            mode:"cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
        })
        .then((response) => response.json())
        .then(data => {
            dispatch(allUsers(data.data.users));
        })
        .catch(error => console.log("error", error));
    }
}

export function current_user_details(){
    return (dispatch) => {
        const url = APIUrls.currentUserDetails();
        fetch(url, {
            method:'GET',
            mode:"cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
        })
        .then((response) => response.json())
        .then(data => {
            dispatch({type: CURRENT_USER, payload: data.data.user });
        })
        .catch(error => console.log("error", error));
    }
}

export function add_friends(data){
    return {
        type:ADD_FRIEND,
        payload:data,
    }
}

//related to messages
export function private_message(msg){
    return {
        type:PRIVATE_MESSAGE,
        payload:msg,
    }
}

export function add_message(message, to){
    return (dispatch)=>{
        const url = APIUrls.addMessage(to);
        fetch(url, {
            method:'POST',
            mode:"cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            body : getFormBody({ message  })
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(private_message(data.data.message));
            return;
        })
        .catch((err)=>{
            console.log("error",err);
        })
    }
}

export function user(email){
    return (dispatch) => {
        const url = APIUrls.signIn();
        fetch(url, {
          method: 'POST',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: getFormBody({ email }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
                dispatch(signIn_progress(data.isVerified));
                return;
            }
          })
          .catch((err)=>{
              console.log("error fetch nhi ho rha h!",err);
          })
      };
}

export function user_validate(email, navigate, password){
    return (dispatch)=>{
        const url = APIUrls.validate();
        fetch(url, {
            method:'POST',
            mode:"cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : getFormBody({ email, password })
        })
        .then(async (response) => {
            const data = await response.json();
            
            if(response.status === 200) {
                localStorage.setItem('token', data.data.token);
                dispatch(signIn_success(data.data.user));
                navigate('/dashboard', {state:{user: data.data.user}});
                return;
            }else {
                console.log("success=false");
                dispatch(signIn_failure());
            }
        })
        .catch((err)=>{
            console.log("error hua",err);
        })
    }
}

export function signIn_failure(){
    return {
        type: SIGNIN_FAILURE,
    }
}

export function signIn_progress(isVerified){
    return {
        type: SIGNIN_PROGRESS,
        isVerified,
    }
}

export function signIn_success(user){
    return {
        type:SIGNIN_SUCCESS,
        payload:user,
    }
}

export function friendship(data){
    return{
        type:FRIENDSHIP,
        payload:data
    }
}

export function makeFriend(from,to){
    return (dispatch) => {
        const url = APIUrls.makeFriend(from, to);
        fetch(url, {
          method: 'POST',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
          },
          body: getFormBody({ from, to }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
                dispatch(friendship(data.users));
                return;
              }
          })
          .catch((err)=>{
              console.log("error Receuved",err);
          })
      };
}



export function getChatroom(to, setChatroom){
    return (dispatch) => {
        const url = APIUrls.privateMessage(to);
        fetch(url, {
          method: 'GET',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
             setChatroom(data.data.pm[0]._id);
            if (data.success) {
                return;
              }
          })
          .catch((err)=>{
              console.log("chatrommmmmm error Receuved",err);
          })
      };
}



export function privateMessage(to){
    return (dispatch) => {
        const url = APIUrls.privateMessage(to);
        fetch(url, {
          method: 'GET',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            dispatch(private_message(data.data.pm[0].messages));

            if (data.success) {
                return;
              }
          })
          .catch((err)=>{
              console.log("chatrommmmmm error Receuved",err);
          })
      };
}

export function signUp({email, name, password, confirmPassword, toast}){
    return (dispatch) => {
        const url = APIUrls.signUp();
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            body: getFormBody({ email, name, password, confirmPassword }),
        })
        .then(async (response) => {
            if(response.status === 200){
                toast.success("SignIn to chat with friends!", 2000);
                dispatch({type: SIGNIN_NOW});
            }else {
                toast.warn("Please signUp properly", 2000)
            }
        })
        .catch((error) => { toast.warn("Opps error while sign up!") });
    }
}

