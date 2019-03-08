import { LOGIN, ERROR_MESSAGE, LOADING } from './actions';

const initialState = null;

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return Object.assign({}, state, {loading: true})

        case LOGIN:
            return Object.assign({}, state, {email: action.email, loading: false, error: ''})

        case ERROR_MESSAGE:
            return Object.assign({}, state, {error: action.errorMessage, loading: false})

        default:
            return state;
    }
}

export default loginReducer;