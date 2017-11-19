import axios from 'axios';
import {AUTH_ERROR, AUTH_USER, UNAUTH_USER} from "./types";


const ROOT_URL = 'http://localhost:3000';

export function signinUser({email, password}, callback){

    return function(dispatch){ //다똑같아
        //Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response=>{ //200 or 204인 경우 them을 hit함
                //If request is good...
                //-Update state to indicate user is authenticated
                dispatch({type: AUTH_USER});

                //-Save the JWT token
                localStorage.setItem('token', response.data.token);

                //-Redirect to the route '/feature'
                callback();
            })
            .catch((e)=>{
                //If request is bad
                //- Show an error to the user
                dispatch(authError('Bad Login Info'))
            })
    }
}

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    }
}