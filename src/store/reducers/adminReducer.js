import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    gender: [],
    roles: [],
    positions: [],
    users: [],
    topDoctor: [],
    allDoctor: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.gender = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAILD:
            state.gender = [];
            state.isLoadingGender = false;
            return {
                ...state,
            };
        // ======================================================
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILD:
            state.positions = [];
            return {
                ...state,
            };
        // ========================================================
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILD:
            state.roles = [];
            return {
                ...state,
            };
        // ========================================================

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USER_FAILD:
            state.users = [];
            return {
                ...state,
            };
        // ========================================================

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.dataDoctor;
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTOR_FAILD:
            state.topDoctor = [];
            return {
                ...state,
            };

        // ========================================================

        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctor = action.allDoctor;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTOR_FAILD:
            state.allDoctor = [];
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
