import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvaiableTime: [],
            isOpenModal: false,
            dataScheduleModalTime: {},
        };
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.setSchedule(language);
        this.setState({
            allDays: allDays,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.setSchedule(this.props.language);
            this.setState({
                allDays: allDays,
            });
        }

        if (this.props.detailDoctor !== prevProps.detailDoctor) {
            let allDays = this.setSchedule(this.props.language);
            let res = await getScheduleDoctorByDate(
                this.props.detailDoctor,
                allDays[0].value
            );
            this.setState({
                allAvaiableTime: res.data ? res.data : [],
            });
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setSchedule = (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date())
                        .add(i, 'days')
                        .format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).locale('en').format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date())
                        .add(i, 'days')
                        .locale('en')
                        .format('ddd - DD/MM');
                }
            }

            object.value = moment(new Date())
                .add(i, 'days')
                .startOf('day')
                .valueOf();

            arrDate.push(object);
        }
        return arrDate;
    };

    handleOnchangeSelect = async (e) => {
        let date = e.target.value;
        let doctorId = this.props.detailDoctor;
        // console.log(doctorId, date);
        let res = await getScheduleDoctorByDate(doctorId, date);
        console.log(res);
        if (res && res.errCode === 0) {
            this.setState({
                allAvaiableTime: res.data ? res.data : [],
            });
        }
    };
    handleCloseModal = () => {
        this.setState({
            isOpenModal: false,
        });
    };

    handleOpenModal = (data) => {
        this.setState({
            isOpenModal: true,
            dataScheduleModalTime: data,
        });
    };

    render() {
        let { allDays, allAvaiableTime } = this.state;
        let { language } = this.props;
        return (
            <Fragment>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(e) => this.handleOnchangeSelect(e)}>
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <span>
                                <i className="fa-solid fa-calendar-days"></i>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        <div className="time-content">
                            {allAvaiableTime && allAvaiableTime.length > 0 ? (
                                <>
                                    <div className="time-content-btn">
                                        {allAvaiableTime.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() =>
                                                    this.handleOpenModal(item)
                                                }
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.timeTypeData.valueVi
                                                    : item.timeTypeData.valueEn}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="book-free">
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />{' '}
                                            <i className="fa-solid fa-hand-pointer"></i>{' '}
                                            <FormattedMessage id="patient.detail-doctor.book-free" />
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="no-schedule">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <BookingModal
                    isOpen={this.state.isOpenModal}
                    isClose={this.handleCloseModal}
                    dataTime={this.state.dataScheduleModalTime}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
