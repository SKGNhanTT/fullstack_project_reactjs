import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', {
        email,
        password,
    });
};

const getAllUser = (userId) => {
    return axios.get(`/api/get-all-user?id=${userId}`);
};

const addNewUser = (data) => {
    return axios.post('/api/create-new-user', {
        data,
    });
};

const deleteUser = (id) => {
    return axios.delete('/api/delete-user', {
        data: {
            id,
        },
    });
};

const editUser = (user) => {
    return axios.put('api/edit-user', user);
};

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};

const getDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

export {
    handleLoginApi,
    getAllUser,
    addNewUser,
    deleteUser,
    editUser,
    getAllCodeService,
    getDoctorHomeService,
};
