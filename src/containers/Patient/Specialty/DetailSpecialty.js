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

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
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
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: resProvince.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnchange = (e) => {
        console.log(e.target.value);
    };

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;

        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailSpecialty &&
                            !_.isEmpty(dataDetailSpecialty) && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: dataDetailSpecialty.descriptionHTML,
                                    }}
                                ></div>
                            )}
                    </div>
                    <div className="search-sp-doctor">
                        {!_.isEmpty(listProvince) && (
                            <select onChange={(e) => this.handleOnchange(e)}>
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
                        )}
                    </div>

                    {arrDoctorId &&
                        arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => (
                            <div className="each-doctor">
                                <div className="dt-content-left">
                                    <div className="profile-doctor">
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescription={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
