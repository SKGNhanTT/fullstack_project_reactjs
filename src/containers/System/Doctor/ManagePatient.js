import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
        };
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate);
    }

    getDataPatient = async (user, formatedDate) => {
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
            () => {
                let { user } = this.props;
                let { currentDate } = this.state;
                let formatedDate = new Date(currentDate).getTime();
                this.getDataPatient(user, formatedDate);
            }
        );
    };
    handleConfirm = () => {};
    handleSendInvoice = () => {};
    render() {
        let { dataPatient } = this.state;
        return (
            <Fragment>
                <div className="manage-patient-container">
                    <div className="m-p-titler">Quản lí bệnh nhân</div>
                    <div className="manage-patient-body row">
                        <div className="col-4 form-group">
                            <label>Chọn ngày khám</label>
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
                                        <th className="col-1">No</th>
                                        <th className="col-2">Time</th>
                                        <th className="col-2">Name</th>
                                        <th className="col-2">Address</th>
                                        <th className="col-2">Gender</th>
                                        <th className="col-3">Action</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ? (
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {
                                                            item
                                                                .timeTypeDataPatient
                                                                .valueEn
                                                        }
                                                    </td>
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
                                                    <td>
                                                        {
                                                            item.patientData
                                                                .genderData
                                                                .valueEn
                                                        }
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn-confirm"
                                                            onClick={() =>
                                                                this.handleConfirm()
                                                            }
                                                        >
                                                            Confirm
                                                        </button>
                                                        <button
                                                            className="btn-send"
                                                            onClick={() =>
                                                                this.handleSendInvoice()
                                                            }
                                                        >
                                                            Send Invoice
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>No data</tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
