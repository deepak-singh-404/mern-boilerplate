import axios from 'axios'
import setAuthToken from '../helper/setAuthToken'
import jwt_decode from 'jwt-decode'


export const userLoginHelper = (data) => {
    return {
        type: "SET_USERS_DATA",
        payload: data
    }
}

const userLogoutHelper = (data) => {
    return {
        type: "DELETE_USERS_DATA",
        payload: data
    }
}


const registerLoaderFlagHelper = (data) => {
    return {
        type: "SET_REGISTER_LOADER",
        payload: data
    }
}

export const userRegister = (userRegisterCredentials,history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Post",
                url: "http://localhost:5000/api/user/register",
                data: userRegisterCredentials
            })
            dispatch(registerLoaderFlagHelper(true))
            history.push('/')
        }
        catch (err) {
            dispatch({
                type:"SET_REGISTER_ERRORS",
                payload: err.response.data
            })
            console.log("Error in userRegister Action", err.message)
        }
       
    }
}

export const userLogin = (userLoginCredentials,history) => {
    return async (dispatch) => {
        try {
        
            const { data } = await axios({
                method: "Post",
                url: "http://localhost:5000/api/user/login",
                data: userLoginCredentials
            })
            
            const { token } = data
            localStorage.setItem('userJwtToken', token);
            
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(userLoginHelper(decoded.user))
            history.push('/home')
        }
        catch (err) {
            dispatch({
                type: "SET_LOGIN_ERRORS",
                payload: err.response.data
            })
            console.log("Error in userLogin Action", err.message)
        }

    }
}


export const getOTP = (userEmail) => {
    return async (dispatch) => {
        try {
            await axios({
                method: 'Post',
                url: 'http://localhost:5000/api/user/forgotPassword',
                data: userEmail
            })
            alert("Otp has been sent to your email")
            dispatch({
                type: "SET_FORGOT_PASSWORD_HELPER_FLAG",
                payload: true
            })
           
        }
        catch (err) {
            dispatch({
                type: "SET_FORGOT_PASSWORD_ERRORS",
                payload: err.response.data
            })
            console.log("Error in getOTPUser", err.message)
        }
    }
}

export const submitOTP = (newPasswordWithOtp, history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: "http://localhost:5000/api/user/postOTP",
                data: newPasswordWithOtp
            })
            alert("Password Update, kindly login with updated password")
            history.push('/')
        }
        catch (err) {
            dispatch({
                type: "SET_FORGOT_PASSWORD_ERRORS",
                payload: err.response.data
            })
            console.log("Error in submitOTP", err.message)
        }
    }
}

export const updatePassword = (passwordData,history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: "http://localhost:5000/api/user/updatePassword",
                data: passwordData
            })
            alert("Password Updated Successfully")
            history.push('/profile')
        }
        catch (err) {
            dispatch({
                type: "SET_UPDATE_PASSWORD_ERROR",
                payload: err.response.data
            })
        }
    }
}






export const userLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('userJwtToken');
        setAuthToken(false);
        dispatch(userLogoutHelper({}));
    }
}