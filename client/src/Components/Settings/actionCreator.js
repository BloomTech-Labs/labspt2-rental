import axios from 'axios';
import * as actions from './actions';

// updateUser
// CC info and next billing will come from Stripe
// hard code billing plan IDs into update modal.

// keep Store updated with user info. If it changes, update
// use the billing plan ID to query billing table and send that to Stripe

export const updateUser = (user) => {
    return async dispatch => {
        dispatch({type: actions.UPDATE_USER_STARTED})
        try {
            const updatedUser = await axios.put(`${config.apiUrl}/api/endpoint`, user)
            console.log(updatedUser)
            dispatch({
                type: actions.UPDATE_USER_SUCCESS,
                payload: updatedUser
            })   
        } catch (err) {
            console.error(err)
            dispatch({type: actions.UPDATE_USER_ERROR, payload: err})
        }
    }
}