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

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
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
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        let { language } = this.props;

        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    {!_.isEmpty(dataDetailClinic) && (
                        <div className="description-specialty">
                            {dataDetailClinic &&
                                !_.isEmpty(dataDetailClinic) && (
                                    <>
                                        <div>{dataDetailClinic.name}</div>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: dataDetailClinic.descriptionHTML,
                                            }}
                                        ></div>
                                    </>
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
                                    Hiện không có bác sĩ nào ở tỉnh này. Vui
                                    lòng chọn tỉnh khác!
                                </p>
                            </div>
                        </div>
                    </div>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
