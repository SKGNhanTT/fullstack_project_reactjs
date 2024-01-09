import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {
    getDetailSpecialtyById,
    getAllCodeService,
} from '../../../services/userService';
import _ from 'lodash';
import HomeFooter from '../../HomePage/HomeFooter';
import LoadingOverlay from 'react-loading-overlay';
import { withRouter } from 'react-router-dom';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
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
            let res = await getDetailSpecialtyById({ id, location: 'ALL' });

            let resProvince = await getAllCodeService('PROVINCE');

            if (
                res &&
                res.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn quốc',
                    });
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : [],
                    isLoadingOverlay: false,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnchange = async (e) => {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let location = e.target.value;
            let res = await getDetailSpecialtyById({ id, location: location });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    };

    handleShowDetail = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail,
        });
    };

    handleIconBack = () => {
        this.props.history.push('/home');
    };

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince, isShowDetail } =
            this.state;
        let { language } = this.props;

        return (
            <div className="detail-specialty-container">
                <LoadingOverlay
                    active={this.state.isLoadingOverlay}
                    spinner
                    text="Loading..."
                >
                    <HomeHeader />
                    {!_.isEmpty(dataDetailSpecialty) && (
                        <div className="des-specialty">
                            <i
                                className="fa-solid fa-house"
                                onClick={() => this.handleIconBack()}
                            ></i>{' '}
                            /{' '}
                            {language === LANGUAGES.VI
                                ? dataDetailSpecialty.nameVi
                                : dataDetailSpecialty.nameEn}
                        </div>
                    )}
                    <div className="detail-specialty-body">
                        {!_.isEmpty(dataDetailSpecialty) && (
                            <div className="description-specialty">
                                {dataDetailSpecialty &&
                                    !_.isEmpty(dataDetailSpecialty) && (
                                        <div
                                            style={{
                                                maxHeight: !isShowDetail
                                                    ? '200px'
                                                    : '100%',
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    language === LANGUAGES.VI
                                                        ? dataDetailSpecialty.descriptionHTMLVi
                                                        : dataDetailSpecialty.descriptionHTMLEn,
                                            }}
                                        ></div>
                                    )}
                            </div>
                        )}
                        {!_.isEmpty(dataDetailSpecialty) && (
                            <div className="description-specialty">
                                {dataDetailSpecialty &&
                                    !_.isEmpty(dataDetailSpecialty) && (
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
                    {!_.isEmpty(listProvince) && (
                        <div className="doctor-search">
                            <div className="search-sp-doctor">
                                <select
                                    onChange={(e) => this.handleOnchange(e)}
                                >
                                    {listProvince &&
                                        listProvince.length > 0 &&
                                        listProvince.map((item) => {
                                            return (
                                                <option
                                                    key={item.id}
                                                    value={item.keyMap}
                                                >
                                                    {language === LANGUAGES.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                    )}
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
                                                        detailDoctorExtra={item}
                                                        key={index}
                                                        isShowDetail={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                    {!_.isEmpty(listProvince) && _.isEmpty(arrDoctorId) && (
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
                        !_.isEmpty(dataDetailSpecialty) &&
                        !_.isEmpty(listProvince) && <HomeFooter />}
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
    connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty)
);
