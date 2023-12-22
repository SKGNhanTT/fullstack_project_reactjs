import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import { getExtraInforDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = { isShowDetail: false, extraInfo: {} };
    }

    async componentDidMount() {
        if (this.props.detailDoctor) {
            let res = await getExtraInforDoctorById(this.props.detailDoctor);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.detailDoctor !== prevProps.detailDoctor) {
            let res = await getExtraInforDoctorById(this.props.detailDoctor);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data,
                });
            }
        }
    }

    handleShowInforDetail = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail,
        });
    };
    render() {
        let { isShowDetail, extraInfo } = this.state;
        let { language } = this.props;
        return (
            <Fragment>
                <div className="doctor-extra-infor-conatiner">
                    <div className="content-up">
                        <div className="text-address">
                            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
                        </div>
                        <div className="name-clinic">
                            {extraInfo && extraInfo.nameClinic
                                ? extraInfo.nameClinic
                                : ''}
                        </div>
                        <div className="detail-address">
                            {extraInfo && extraInfo.addressClinic
                                ? extraInfo.addressClinic
                                : ''}
                        </div>
                    </div>
                    <div className="content-down">
                        {!isShowDetail ? (
                            <div className="short-infor">
                                <FormattedMessage id="patient.extra-infor-doctor.price" />
                                {extraInfo &&
                                    extraInfo.priceTypeData &&
                                    language === LANGUAGES.VI && (
                                        <NumberFormat
                                            className="currency"
                                            value={
                                                extraInfo.priceTypeData.valueVi
                                            }
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                    )}
                                {extraInfo &&
                                    extraInfo.priceTypeData &&
                                    language === LANGUAGES.EN && (
                                        <NumberFormat
                                            className="currency"
                                            value={
                                                extraInfo.priceTypeData.valueEn
                                            }
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        />
                                    )}
                                <span
                                    className="detail"
                                    onClick={() => this.handleShowInforDetail()}
                                >
                                    <FormattedMessage id="patient.extra-infor-doctor.detail" />
                                </span>
                            </div>
                        ) : (
                            <>
                                <div className="title-price">
                                    {' '}
                                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                                </div>
                                <div className="detail-infor">
                                    <div className="price">
                                        <span className="left">
                                            {' '}
                                            <FormattedMessage id="patient.extra-infor-doctor.price" />
                                        </span>
                                        <span className="right">
                                            {extraInfo &&
                                                extraInfo.priceTypeData &&
                                                language === LANGUAGES.VI && (
                                                    <NumberFormat
                                                        value={
                                                            extraInfo
                                                                .priceTypeData
                                                                .valueVi
                                                                ? extraInfo
                                                                      .priceTypeData
                                                                      .valueVi
                                                                : ''
                                                        }
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'VND'}
                                                    />
                                                )}
                                            {extraInfo &&
                                                extraInfo.priceTypeData &&
                                                language === LANGUAGES.EN && (
                                                    <NumberFormat
                                                        value={
                                                            extraInfo
                                                                .priceTypeData
                                                                .valueEn
                                                                ? extraInfo
                                                                      .priceTypeData
                                                                      .valueEn
                                                                : ''
                                                        }
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'$'}
                                                    />
                                                )}
                                        </span>
                                    </div>
                                    <div className="note">
                                        {extraInfo &&
                                            extraInfo.priceTypeData &&
                                            extraInfo.note}
                                    </div>
                                </div>
                                <div className="payment">
                                    <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                    {extraInfo &&
                                    extraInfo.paymentTypeData &&
                                    language === LANGUAGES.VI
                                        ? extraInfo.paymentTypeData.valueVi
                                        : extraInfo.paymentTypeData.valueEn}
                                </div>
                                <div className="hide-price">
                                    <span
                                        onClick={() =>
                                            this.handleShowInforDetail()
                                        }
                                    >
                                        <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                                    </span>
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
