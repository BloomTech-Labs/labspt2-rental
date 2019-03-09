import axios from 'axios';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const LOGIN_USER_LOADING = 'LOGIN_USER_LOADING';

export const loginUser = (credentials) => {
    return async dispatch => {
        dispatch({ type: LOGIN_USER_LOADING })

        try {
            const token = await axios.post('http://138.197.202.158/api/users/login', credentials)
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: 'Bearer' + token
            })
        } catch (err) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: err
            })
        }
    }
}