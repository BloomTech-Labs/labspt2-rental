import { 
    FETCH_TRACKING_ATTEMPT, 
    FETCH_TRACKING_SUCCESS,
    FETCH_TRACKING_ERROR,
} from './actions';

const initialState = {
    error: '',
    loading: false,
    reservation: null
};

const trackerReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case FETCH_TRACKING_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: '',
            }
        case FETCH_TRACKING_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case FETCH_TRACKING_SUCCESS:
            return {
                ...state,
                loading: false,
                reservation: payload,
                error: '',
            }
        default:
            return state;
    }
}

export default trackerReducer;