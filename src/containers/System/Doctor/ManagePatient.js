import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import {
    getAllPatientForDoctor,
    sendRemedy,
} from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }

    async componentDidMount() {
        await this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            }
        );
    };
    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };

        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };
    handleCloseModal = () => {
        this.setState({
            isOpenRemedyModal: false,
        });
    };
    sendRemedy = async (data) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        });
        let res = await sendRemedy({
            ...data,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success('Send Remedy succeed!');
            await this.getDataPatient();
            this.handleCloseModal();
        } else {
            this.setState({
                isShowLoading: false,
            });
            toast.error('Something wrongs...');
        }
    };
    render() {
        let { dataPatient, dataModal } = this.state;
        let { language } = this.props;
        return (
            <Fragment>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading..."
                >
                    <div className="manage-patient-container">
                        <div className="m-p-titler">
                            <FormattedMessage id="manage-patient.title" />
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label>
                                    <FormattedMessage id="manage-patient.choose-day" />
                                </label>
                                <DatePicker
                                    onChange={this.handleChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className="col-12 table-manage-patient">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th className="col-1">
                                                <FormattedMessage id="manage-patient.no" />
                                            </th>
                                            <th className="col-2">
                                                <FormattedMessage id="manage-patient.time" />
                                            </th>
                                            <th className="col-2">
                                                <FormattedMessage id="manage-patient.name" />
                                            </th>
                                            <th className="col-2">
                                                <FormattedMessage id="manage-patient.address" />
                                            </th>
                                            <th className="col-2">
                                                <FormattedMessage id="manage-patient.gender" />
                                            </th>
                                            <th className="col-3">
                                                <FormattedMessage id="manage-patient.action" />
                                            </th>
                                        </tr>
                                        {dataPatient &&
                                        dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let gender =
                                                    language === LANGUAGES.VI
                                                        ? item.patientData
                                                              .genderData
                                                              .valueVi
                                                        : item.patientData
                                                              .genderData
                                                              .valueEn;

                                                let time =
                                                    language === LANGUAGES.VI
                                                        ? item
                                                              .timeTypeDataPatient
                                                              .valueVi
                                                        : item
                                                              .timeTypeDataPatient
                                                              .valueEn;
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .firstName
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .address
                                                            }
                                                        </td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className="btn-confirm"
                                                                onClick={() =>
                                                                    this.handleConfirm(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                Confirm
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <FormattedMessage id="manage-patient.nodata" />
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpen={this.state.isOpenRemedyModal}
                        isClose={() => this.handleCloseModal()}
                        dataModal={dataModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
