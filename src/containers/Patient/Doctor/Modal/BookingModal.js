import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { LANGUAGES } from '../../../../utils';
import moment from 'moment';

// import { FormattedMessage } from 'react-intl';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTimeState: {},
        };
    }

    async componentDidMount() {
        this.setState({
            dataTimeState: this.props.dataTime,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.dataTime !== prevProps.dataTime) {
        //     this.setState({
        //         dataTimeState: this.props.dataTime,
        //     });
        // }
    }

    render() {
        let { dataTime } = this.props;
        let { language } = this.props;
        let { dataTimeState } = this.state;
        let localTimeEn = moment(dataTimeState.date).format('YYYY-MM-DD');
        let localTimeVi = moment(dataTimeState.date).format('DD-MM-YYYY');

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
                            Thông Tin Đặt Lịch Khám Bệnh Ngày{' '}
                            <span>
                                {`${
                                    language === LANGUAGES.VI
                                        ? localTimeVi
                                        : localTimeEn
                                }`}
                            </span>{' '}
                            <span>
                                {`(${
                                    language === LANGUAGES.VI ? timeVi : timeEn
                                })`}
                            </span>
                        </Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <ProfileDoctor doctorId={doctorId} />
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Name</label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchange(e, 'firstName')
                                }
                                value={this.state.firstName}
                            />
                        </div>

                        <div className="input-container ">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchange(e, 'password')
                                }
                                value={this.state.password}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchange(e, 'email')
                                }
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Adress</label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchange(e, 'address')
                                }
                                value={this.state.address}
                            />
                        </div>
                    </div>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Reason</label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchange(e, 'address')
                                }
                                value={this.state.address}
                            />
                        </div>
                        <div className="input-container">
                            <label>Gender</label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchange(e, 'address')
                                }
                                value={this.state.address}
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
                        Close
                    </Button>
                    <Button
                        className="px-3 py-1"
                        variant="primary"
                        // onClick={() => this.handleSaveChange()}
                    >
                        Save Change
                    </Button>
                </Modal.Footer>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
