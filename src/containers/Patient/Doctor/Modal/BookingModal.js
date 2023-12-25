import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProfileDoctor from '../ProfileDoctor';
import { LANGUAGES } from '../../../../utils';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postPatientBookingAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            selectedGender: '',
            birth: '',
            doctorId: '',
            timeType: '',

            genders: '',
        };
    }

    async componentDidMount() {
        this.props.fetchGender();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            this.setState({
                doctorId: this.props.dataTime.doctorId,
                timeType: this.props.dataTime.timeType,
            });
        }
    }

    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label =
                    language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };

    handleOnchangeInput = (e, id) => {
        let valueInput = e.target.value;
        let copyState = { ...this.state };
        copyState[id] = valueInput;
        this.setState({
            ...copyState,
        });
    };

    handleChangeDatePicker = (date) => {
        this.setState({
            birth: date[0],
        });
    };

    handleChangeSelectGender = (selectedGender) => {
        this.setState({ selectedGender });
    };

    handleSaveChange = async () => {
        // let date = new Date(this.state.birth).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            selectedGender: this.state.selectedGender.value,
            date: this.props.dataTime.date,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });

        if (res && res.errCode === 0) {
            toast.success('Create appointment succeed!');
            this.props.isClose();
            this.setState({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                selectedGender: '',
                birth: '',
            });
        } else if (res && res.errCode === 3) {
            toast.error(
                'At this time, doctor is not available. Please select another appointment slot.'
            );
        } else {
            toast.error('Create appointment failed!');
        }
    };

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === LANGUAGES.VI
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;
            let date;
            if (language === LANGUAGES.VI) {
                date = this.capitalizeFirstLetter(
                    moment
                        .unix(+dataTime.date / 1000)
                        .format('dddd - DD/MM/YYYY')
                );
            } else {
                date = moment
                    .unix(+dataTime.date / 1000)
                    .locale('en')
                    .format('ddd - MM/DD/YYYY');
            }

            return `${time} - ${date}`;
        }
        return <></>;
    };
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === LANGUAGES.VI
                    ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                    : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }
        return <></>;
    };

    render() {
        let { dataTime } = this.props;
        let { language } = this.props;

        let doctorId = '';
        let timeVi, timeEn;
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
            timeVi = dataTime.timeTypeData.valueVi;
            timeEn = dataTime.timeTypeData.valueEn;
        }

        return (
            <Modal
                show={this.props.isOpen}
                onHide={this.props.isClose}
                animation={true}
                size="lg"
                className="modal-user-container"
            >
                <Modal.Header>
                    <div>
                        <Modal.Title>
                            <FormattedMessage id="patient.booking-modal.title" />
                        </Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <ProfileDoctor
                            doctorId={doctorId}
                            isShowDescription={false}
                            dataTime={dataTime}
                            isShowLinkDetail={false}
                            isShowPrice={true}
                        />
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="patient.booking-modal.fullName" />
                            </label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchangeInput(e, 'fullName')
                                }
                                value={this.state.fullName}
                            />
                        </div>

                        <div className="input-container ">
                            <label>
                                <FormattedMessage id="patient.booking-modal.phoneNumber" />
                            </label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchangeInput(e, 'phoneNumber')
                                }
                                value={this.state.phoneNumber}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="patient.booking-modal.email" />
                            </label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchangeInput(e, 'email')
                                }
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="patient.booking-modal.address" />
                            </label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchangeInput(e, 'address')
                                }
                                value={this.state.address}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container max-width">
                            <label>
                                <FormattedMessage id="patient.booking-modal.reason" />
                            </label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchangeInput(e, 'reason')
                                }
                                value={this.state.reason}
                            />
                        </div>
                    </div>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="patient.booking-modal.birthday" />
                            </label>
                            <DatePicker
                                onChange={this.handleChangeDatePicker}
                                className="form-control"
                                value={this.state.birth}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="patient.booking-modal.gender" />
                            </label>
                            <Select
                                value={this.state.selectedGender}
                                onChange={this.handleChangeSelectGender}
                                options={this.state.genders}
                            />
                        </div>
                    </div>

                    {/* <div>
                        <p>
                            {this.state.isValid
                                ? `Please input feild ${this.state.isValidMess}`
                                : ''}
                        </p>
                    </div> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="px-3 py-1"
                        variant="secondary"
                        onClick={this.props.isClose}
                    >
                        <FormattedMessage id="patient.booking-modal.cancel-btn" />
                    </Button>
                    <Button
                        className="px-3 py-1"
                        variant="primary"
                        onClick={() => this.handleSaveChange()}
                    >
                        <FormattedMessage id="patient.booking-modal.btn" />
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.gender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
