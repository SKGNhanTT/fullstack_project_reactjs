import actionTypes from './actionTypes';
import {
    getAllCodeService,
    addNewUser,
    getAllUser,
    deleteUser,
    editUser,
    getDoctorHomeService,
    getAllDoctor,
    saveDetailDoctors,
} from '../../services/userService';
import { toast } from 'react-toastify';

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
    console.log('check data from create function', data);
    return async (dispatch, getState) => {
        try {
            let res = await addNewUser(data);
            console.log('check create user redux', res);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
                toast.success('Create a new user succeed!');
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFaild());
                toast.error('Create a new user failded!');
            }
        } catch (error) {
            dispatch(saveUserFaild());
            toast.error('Create a new user failded!');
        }
    };
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFaild = () => ({
    type: actionTypes.CREATE_USER_FAILD,
});

// ===================================================

export const fetchAllUserStart = () => {
    // type: actionTypes.FETCH_GENDER_START,
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.user));
            } else {
                dispatch(fetchAllUserFaild());
            }
        } catch (error) {
            dispatch(fetchAllUserFaild());
        }
    };
};
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data,
});

export const fetchAllUserFaild = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILD,
});

// ===================================================

export const deletaAUser = (userId) => {
    // type: actionTypes.FETCH_GENDER_START,
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(userId);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                toast.success('Delete user succeed!');
                dispatch(fetchAllUserStart());
            } else {
                dispatch(deleteUserFaild());
                toast.error('Delete user failded!');
            }
        } catch (error) {
            dispatch(deleteUserFaild());
            toast.error('Delete user failded!');
        }
    };
};
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFaild = () => ({
    type: actionTypes.DELETE_USER_FAILD,
});

// ===================================================

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUser(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                toast.success('Edit user succeed!');
                dispatch(fetchAllUserStart());
            } else {
                dispatch(editUserFaild());
                toast.error('Edit user failded!');
            }
        } catch (error) {
            dispatch(editUserFaild());
            toast.error('Edit user failded!');
        }
    };
};
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFaild = () => ({
    type: actionTypes.EDIT_USER_FAILD,
});

// ===================================================
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getDoctorHomeService('3');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILD,
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILD,
            });
        }
    };
};

// ===================================================
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    allDoctor: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILD,
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILD,
            });
        }
    };
};

// ===================================================
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log('data form save', data);
            let res = await saveDetailDoctors(data);
            if (res && res.errCode === 0) {
                toast.success('Save doctor infomation success!!!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            } else {
                toast.error('Save doctor infomation failded!!!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILD,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('Save doctor infomation failded!!!');
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILD,
            });
        }
    };
};
