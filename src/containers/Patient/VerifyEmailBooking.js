import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { postVerifyBookingAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmailBooking.scss';

class VerifyEmailBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }

    async componentDidMount() {
        if (this.props.location) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }

        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <Fragment>
                <HomeHeader />
                <div className="verify-email-container">
                    {!statusVerify ? (
                        <div>Loading...</div>
                    ) : (
                        <div>
                            {errCode === 0 ? (
                                <div className="infor-booking">
                                    Xác nhận lịch hẹn thành công!
                                </div>
                            ) : (
                                <div className="infor-booking">
                                    Lịch hẹn không tồn tại hoặc đã được xác
                                    nhận!
                                </div>
                            )}{' '}
                        </div>
                    )}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailBooking);
