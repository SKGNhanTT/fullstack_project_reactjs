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

const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`);
};
const saveDetailDoctors = (data) => {
    return axios.post('/api/save-info-doctor', {
        data,
    });
};

const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const saveBulkDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    );
};
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

export {
    handleLoginApi,
    getAllUser,
    addNewUser,
    deleteUser,
    editUser,
    getAllCodeService,
    getDoctorHomeService,
    getAllDoctor,
    saveDetailDoctors,
    getDetailInfoDoctor,
    saveBulkDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
};
