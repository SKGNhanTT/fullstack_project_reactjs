import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfor.scss';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = { isShowDetail: false };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleShowInforDetail = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail,
        });
    };
    render() {
        let { isShowDetail } = this.state;
        return (
            <Fragment>
                <div className="doctor-extra-infor-conatiner">
                    <div className="content-up">
                        <div className="text-address">ĐỊA CHỈ KHÁM</div>
                        <div className="name-clinic">
                            Phòng khám Chuyên khoa Da Liễu
                        </div>
                        <div className="detail-address">
                            207 Phố Huế - Hai Bà Trưng - Hà Nội
                        </div>
                    </div>
                    <div className="content-down">
                        {!isShowDetail ? (
                            <div className="short-infor">
                                GIÁ KHÁM 250.000VND.{' '}
                                <span
                                    onClick={() => this.handleShowInforDetail()}
                                >
                                    Xem chi tiết
                                </span>
                            </div>
                        ) : (
                            <>
                                <div className="title-price">Giá Khám</div>
                                <div className="detail-infor">
                                    <div className="price">
                                        <span className="left">Giá khám</span>
                                        <span className="right">
                                            250.000VND
                                        </span>
                                    </div>
                                    <div className="note">
                                        Được ưu tiên người khám qua BookingCare.
                                    </div>
                                </div>
                                <div className="payment">
                                    Thanh toán bằng tiền mặt.
                                </div>
                                <div
                                    className="hide-price"
                                    onClick={() => this.handleShowInforDetail()}
                                >
                                    <span>Ẩn bảng giá</span>
                                </div>
                            </>
                        )}
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
