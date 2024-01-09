import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {
    getDetailClinicById,
    getAllCodeService,
} from '../../../services/userService';
import _ from 'lodash';
import HomeFooter from '../../HomePage/HomeFooter';
import LoadingOverlay from 'react-loading-overlay';
import { withRouter } from 'react-router-dom';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            isLoadingOverlay: true,
            isShowDetail: false,
        };
    }

    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await getDetailClinicById({ id });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                    isLoadingOverlay: false,
                });
            }
        }
    }
    handleIconBack = () => {
        this.props.history.push('/home');
    };
    handleShowDetail = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail,
        });
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { arrDoctorId, dataDetailClinic, isShowDetail } = this.state;
        let { language } = this.props;

        return (
            <div className="detail-specialty-container">
                <LoadingOverlay
                    active={this.state.isLoadingOverlay}
                    spinner
                    text="Loading..."
                >
                    <HomeHeader />
                    {!_.isEmpty(dataDetailClinic) && (
                        <div className="des-specialty">
                            <i
                                className="fa-solid fa-house"
                                onClick={() => this.handleIconBack()}
                            ></i>{' '}
                            /{' '}
                            {language === LANGUAGES.VI
                                ? dataDetailClinic.nameVi
                                : dataDetailClinic.nameEn}
                        </div>
                    )}
                    <div className="detail-specialty-body">
                        {!_.isEmpty(dataDetailClinic) && (
                            <div className="description-specialty">
                                {dataDetailClinic &&
                                    !_.isEmpty(dataDetailClinic) && (
                                        <>
                                            <div>{dataDetailClinic.name}</div>
                                            <div
                                                style={{
                                                    maxHeight: !isShowDetail
                                                        ? '200px'
                                                        : '100%',
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        language ===
                                                        LANGUAGES.VI
                                                            ? dataDetailClinic.descriptionHTMLVi
                                                            : dataDetailClinic.descriptionHTMLEn,
                                                }}
                                            ></div>
                                        </>
                                    )}
                            </div>
                        )}
                        {!_.isEmpty(dataDetailClinic) && (
                            <div className="description-specialty">
                                {dataDetailClinic &&
                                    !_.isEmpty(dataDetailClinic) && (
                                        <span
                                            className="view-detail"
                                            onClick={() =>
                                                this.handleShowDetail()
                                            }
                                        >
                                            {isShowDetail ? (
                                                <FormattedMessage id="patient.detail-doctor.hidden" />
                                            ) : (
                                                <FormattedMessage id="patient.detail-doctor.show" />
                                            )}
                                        </span>
                                    )}
                            </div>
                        )}
                    </div>

                    {!_.isEmpty(arrDoctorId) && (
                        <div className="doctor-item">
                            <div>
                                {arrDoctorId &&
                                    arrDoctorId.length > 0 &&
                                    arrDoctorId.map((item, index) => (
                                        <div className="each-doctor">
                                            <div className="dt-content-left">
                                                <div className="profile-doctor">
                                                    <ProfileDoctor
                                                        doctorId={item}
                                                        isShowDescription={true}
                                                        isShowLinkDetail={true}
                                                        isShowPrice={false}
                                                        // dataTime={dataTime}
                                                    />
                                                </div>
                                            </div>
                                            <div className="dt-content-right">
                                                <div className="doctor-schedule">
                                                    <DoctorSchedule
                                                        detailDoctor={item}
                                                        key={index}
                                                    />
                                                </div>
                                                <div className="doctor-extra-infor">
                                                    <DoctorExtraInfor
                                                        detailDoctor={item}
                                                        key={index}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                    {_.isEmpty(arrDoctorId) && (
                        <div className="doctor-item">
                            <div>
                                <div className="each-doctor">
                                    <p className="no-doctor">
                                        <FormattedMessage id="patient.detail-doctor.no-doctor" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {!_.isEmpty(arrDoctorId) &&
                        !_.isEmpty(dataDetailClinic) && <HomeFooter />}
                </LoadingOverlay>
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
    return {};
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(DetailClinic)
);
