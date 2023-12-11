import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTimes();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctor);
            this.setState({
                listDoctor: dataSelect,
            });
        }

        if (prevProps.allTimes !== this.props.allTimes) {
            let data = this.props.allTimes;
            if (data && data.length > 0) {
                data = data.map((item) => ({ ...item, isSlected: false }));
            }
            this.setState({
                rangeTime: data,
            });
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.builDataInputSelect(this.props.allDoctor);
        //     this.setState({
        //         listDoctor: dataSelect,
        //     });
        // }
    }

    builDataInputSelect = (data) => {
        let res = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                res.push(object);
            });
        }

        return res;
    };

    handleChangeSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                if (item.id === time.id) item.isSlected = !item.isSlected;
                return item;
            });
        }
        this.setState({
            rangeTime: rangeTime,
        });
    };
    handleSaveSchedule = async () => {
        let result = [];
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        if (!currentDate) {
            toast.error('Please choose valid date!');
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Please choose doctor!');
            return;
        }
        let formatedDate = new Date(currentDate).getTime();
        console.log(formatedDate);
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(
                (item) => item.isSlected === true
            );
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((time) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = time.keyMap;
                    result.push(object);
                });
            } else {
                toast.error('Please choose time!');
                return;
            }
        }
        toast.success('Create schedule success!');
        let res = await saveBulkDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate,
        });
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                item.isSlected = false;
                return item;
            });
        }
        console.log(res);
        if (res && res.errCode === 0) {
            this.setState({
                selectedDoctor: {},
                currentDate: '',
                rangeTime: rangeTime,
            });
        }
    };
    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        let today = new Date();
        today.setDate(today.getDate() - 1);
        return (
            <React.Fragment>
                <div className="manage-schedule-container">
                    <div className="m-s-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row form-group">
                            <div className="col-6">
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-doctor" />
                                </label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelectDoctor}
                                    options={this.state.listDoctor}
                                />
                            </div>
                            <div className="col-6">
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-date" />
                                </label>
                                <DatePicker
                                    onChange={this.handleChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={today}
                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                {rangeTime &&
                                    rangeTime.length > 0 &&
                                    rangeTime.map((item) => (
                                        <button
                                            key={item.id}
                                            className={
                                                item.isSlected
                                                    ? 'btn btn-schedule active'
                                                    : 'btn btn-schedule'
                                            }
                                            onClick={() =>
                                                this.handleClickBtnTime(item)
                                            }
                                        >
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </button>
                                    ))}
                            </div>
                            <div className="col-12">
                                <button
                                    className="btn btn-primary btn-save-schedule"
                                    onClick={() => this.handleSaveSchedule()}
                                >
                                    <FormattedMessage id="manage-schedule.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        allTimes: state.admin.allTimes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTimes: () => dispatch(actions.fetchAllScheduleTimes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
