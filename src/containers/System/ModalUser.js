import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            isValidMess: '',
            isValid: false,
        };
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                isValidMess: '',
                isValid: false,
            });
        });
    }

    componentDidMount() {}

    handleOnchange = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.onCreateNewUser(this.state);
        }
    };

    checkValidateInput = () => {
        let arrInput = [
            'email',
            'password',
            'firstName',
            'lastName',
            'address',
        ];
        let flag = true;
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                flag = false;
                this.setState({
                    isValid: true,
                    isValidMess: arrInput[i],
                });
                break;
            } else {
                flag = true;
                this.setState({
                    isValid: false,
                });
            }
        }
        return flag;
    };

    render() {
        return (
            <Modal
                show={this.props.isOpen}
                onHide={this.props.onhandleCloseAddUser}
                animation={true}
                size="lg"
                centered
                className="modal-user-container"
            >
                <Modal.Header>
                    <Modal.Title>Create a New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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

                        <div className="input-container ">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(e) =>
                                    this.handleOnchange(e, 'password')
                                }
                                value={this.state.password}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>First Name</label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchange(e, 'firstName')
                                }
                                value={this.state.firstName}
                            />
                        </div>

                        <div className="input-container ">
                            <label>Last Name</label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    this.handleOnchange(e, 'lastName')
                                }
                                value={this.state.lastName}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container max-width">
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
                    <div>
                        <p>
                            {this.state.isValid
                                ? `Please input feild ${this.state.isValidMess}`
                                : ''}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="px-3 py-1"
                        variant="secondary"
                        onClick={this.props.onhandleCloseAddUser}
                    >
                        Close
                    </Button>
                    <Button
                        className="px-3 py-1"
                        variant="primary"
                        onClick={() => this.handleAddNewUser()}
                    >
                        Add New
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
