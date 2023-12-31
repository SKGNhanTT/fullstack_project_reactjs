import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './RemedyModal.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import DatePicker from '../../../../components/Input/DatePicker';
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
            timeType: '',
        };
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                timeType: this.props.dataModal.timeType,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                timeType: this.props.dataModal.timeType,
            });
        }
    }
    handleOnchangeInput = (e) => {
        this.setState({
            email: e.target.value,
        });
    };
    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.toBase64(file);
            this.setState({
                imgBase64: base64,
            });
        }
    };

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    };
    render() {
        return (
            <Modal
                show={this.props.isOpen}
                onHide={this.props.isClose}
                animation={true}
                size="md"
                className="modal-user-container"
                backdrop="static"
                keyboard={true}
                centered
            >
                <Modal.Header>
                    <div>
                        <h5>Gửi hóa đơn khám bệnh</h5>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div></div>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="patient.booking-modal.email" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => this.handleOnchangeInput(e)}
                                value={this.state.email}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="patient.booking-modal.phoneNumber" />
                            </label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(e) => this.handleOnchangeImage(e)}
                            />
                        </div>
                    </div>
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
                        onClick={() => this.handleSendRemedy()}
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
