import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleOnchangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    };
    handleOnchangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleLogin = () => {
        console.log(this.state.username);
        console.log(this.state.password);
    };
    render() {
        return (
            <div>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content row">
                            <div className="col-12 text-login">Login</div>
                            <div className="col-12 form-group login-input">
                                <label>Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your name"
                                    value={this.state.username}
                                    onChange={(e) =>
                                        this.handleOnchangeUsername(e)
                                    }
                                    required
                                />
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(e) =>
                                        this.handleOnchangePassword(e)
                                    }
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <button
                                    className="btn-login"
                                    onClick={() => {
                                        this.handleLogin();
                                    }}
                                >
                                    Log in
                                </button>
                            </div>
                            <div className="col-12">
                                <span className="forgot-password">
                                    Forgot your password
                                </span>
                            </div>
                            <div className="col-12"></div>
                            <div className="col-12 text-center">
                                <span className="text-other-login mt-3">
                                    Or Login with:
                                </span>
                            </div>
                            <div className="col-12 social-login">
                                <i className="fab fa-google-plus-g google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) =>
            dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
