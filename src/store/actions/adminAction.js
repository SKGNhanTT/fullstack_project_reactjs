import actionTypes from './actionTypes';
import { getAllCodeService, addNewUser } from '../../services/userService';

export const fetchGenderStart = () => {
    // type: actionTypes.FETCH_GENDER_START,
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFaild());
            }
        } catch (error) {
            dispatch(fetchGenderFaild());
            console.log(error);
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});

export const fetchGenderFaild = () => ({
    type: actionTypes.FETCH_GENDER_FAILD,
});

// =====================================================

export const fetchPositionStart = () => {
    // type: actionTypes.FETCH_GENDER_START,
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchGenderFaild());
            }
        } catch (error) {
            dispatch(fetchPositionFaild());
            console.log(error);
        }
    };
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});

export const fetchPositionFaild = () => ({
    type: actionTypes.FETCH_POSITION_FAILD,
});

// ===================================================

export const fetchRoleStart = () => {
    // type: actionTypes.FETCH_GENDER_START,
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchGenderFaild());
            }
        } catch (error) {
            dispatch(fetchRoleFaild());
            console.log(error);
        }
    };
};
export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData,
});

export const fetchRoleFaild = () => ({
    type: actionTypes.FETCH_ROLE_FAILD,
});

// ===================================================

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await addNewUser(data);
            console.log('check create user redux', res);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
            } else {
                dispatch(saveUserFaild());
            }
        } catch (error) {
            dispatch(saveUserFaild());
            console.log(error);
        }
    };
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFaild = () => ({
    type: actionTypes.CREATE_USER_FAILD,
});
