import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

export const GET_ERRORS = "GET_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";


export const setCurrentUser = decodedUser => {
    return {
        type: SET_CURRENT_USER,
        payload: decodedUser
    };
};

// registers a user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/registration', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            const {
                token
            } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decodedUser = jwtDecode(token);
            dispatch(setCurrentUser(decodedUser));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};