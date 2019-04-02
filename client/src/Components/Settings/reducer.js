import * as actions from './actions';

const initialState = {
    loading: false,
    error: false
    // additional state needed
}

const settingsReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.UPDATE_USER_STARTED:
        return {
            ...state,
            loading: true
        };
        case actions.UPDATE_USER_SUCCESS:
        return {
            ...state,
            loading: false
        };
        case actions.UPDATE_USER_ERROR:
        return {
            ...state,
            loading: false,
            error: action.error
        };
        default:
        return {...state};
    }
};

export default settingsReducer;