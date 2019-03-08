import axios from 'axios';

export const LOGIN = 'LOGIN';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const LOADING = 'LOADING';

export const login = (credentials) => {
    return(dispatch) => {
        dispatch({ type: LOADING })
        
        axios
        .post('http://138.197.202.158', credentials)
        .then(response => {
            localStorage.setItem('jwt', response.data.token);
            dispatch({
                type: LOGIN,
                payload: true
            });
        })
        .catch(err => {
            dispatch({
                type: ERROR_MESSAGE,
                errorMessage: err
            })
        })
    }
}