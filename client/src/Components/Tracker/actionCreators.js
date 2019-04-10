import axios from 'axios';
import { 
    FETCH_TRACKING_ATTEMPT,
    FETCH_TRACKING_ERROR,
    FETCH_TRACKING_SUCCESS,
} from './actions';
import config from "config";

export const fetchReservationInfo = (queryParam) => async (dispatch) => {
    dispatch({
        type: FETCH_TRACKING_ATTEMPT
    })

    try {
        const response = await axios.get(`${config.apiUrl}/api/reservations`)
        dispatch({
            type: FETCH_TRACKING_SUCCESS,
            payload: response.data
        })
    } catch (err){
        console.error(err);
        dispatch({
            type: FETCH_TRACKING_ERROR,
            payload: err.response.data.error
        })
    }
}