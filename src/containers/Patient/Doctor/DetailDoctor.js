import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import {
    getDetailInfoDoctor,
    getAllSpecialty,
} from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import HomeFooter from '../../HomePage/HomeFooter';
import LoadingOverlay from 'react-loading-overlay';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: [],
            isLoadingOverlay: true,
            nameSpecilaty: '',
        };
    }

    async componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // You can change this to 'auto' for instant scrolling
        });
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await getDetailInfoDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                    isLoadingOverlay: false,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevState.detailDoctor.Doctor_Infor !==
            this.state.detailDoctor.Doctor_Infor
        ) {
            let res = await getAllSpecialty();
            let name = '';
            if (res.data && res.data.length > 0) {
                res.data.map((item) => {
                    if (
                        item.id ===
                        this.state.detailDoctor.Doctor_Infor.specialtyId
                    ) {
                        name = item.name;
                    }
                    return name;
                });
            }
            this.setState({
                nameSpecilaty: name,
            });
        }
    }
    handleIconBack = () => {
        this.props.history.push('/home');
    };
    handleBackSpecialty = (id) => {
        this.props.history.push(`/detail-specialty/${id}`);
    };

    render() {
        let { detailDoctor, nameSpecilaty } = this.state;
        let { language } = this.props;
        let nameVi, nameEN;
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEN = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
            <LoadingOverlay
                active={this.state.isLoadingOverlay}
                spinner
                text="Loading..."
            >
                <Fragment>
                    <HomeHeader isShowBanner={false} />
                    <div className="doctor-detail-container">
                        {!_.isEmpty(nameSpecilaty) && (
                            <div className="des-doctor">
                                <i
                                    className="fa-solid fa-house"
                                    onClick={() => this.handleIconBack()}
                                ></i>{' '}
                                /{' '}
                                {nameSpecilaty && (
                                    <span
                                        className="des-specialty"
                                        onClick={() =>
                                            this.handleBackSpecialty(
                                                this.state.detailDoctor
                                                    .Doctor_Infor.specialtyId
                                            )
                                        }
                                    >
                                        {nameSpecilaty}
                                    </span>
                                )}{' '}
                                / {language === LANGUAGES.VI ? nameVi : nameEN}
                            </div>
                        )}
                        <div className="intro-contor">
                            <div
                                className="content-left"
                                style={{
                                    backgroundImage: `url(${
                                        detailDoctor && detailDoctor.image
                                            ? detailDoctor.image
                                            : ''
                                    })`,
                                }}
                            ></div>
                            <div className="content-right">
                                <div className="up">
                                    {language === LANGUAGES.VI
                                        ? nameVi
                                        : nameEN}
                                </div>
                                <div className="down">
                                    {language === LANGUAGES.VI &&
                                        detailDoctor.Markdown &&
                                        detailDoctor.Markdown.descriptionVi && (
                                            <span>
                                                {
                                                    detailDoctor.Markdown
                                                        .descriptionVi
                                                }
                                            </span>
                                        )}
                                    {language === LANGUAGES.EN &&
                                        detailDoctor.Markdown &&
                                        detailDoctor.Markdown.descriptionEn && (
                                            <span>
                                                {
                                                    detailDoctor.Markdown
                                                        .descriptionEn
                                                }
                                            </span>
                                        )}
                                </div>
                            </div>
                        </div>
                        {!_.isEmpty(detailDoctor) && (
                            <div className="schedule-doctor">
                                <div className="content-left">
                                    <DoctorSchedule
                                        detailDoctor={
                                            detailDoctor && detailDoctor.id
                                                ? detailDoctor.id
                                                : -1
                                        }
                                    />
                                </div>
                                <div className="content-right">
                                    <DoctorExtraInfor
                                        detailDoctor={
                                            detailDoctor && detailDoctor.id
                                                ? detailDoctor.id
                                                : -1
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        {detailDoctor &&
                            detailDoctor.Markdown &&
                            detailDoctor.Markdown.contentHTMLVi &&
                            language === LANGUAGES.VI && (
                                <div className="detail-info">
                                    <div
                                        className="detail-doctor-content"
                                        dangerouslySetInnerHTML={{
                                            __html: detailDoctor.Markdown
                                                .contentHTMLVi,
                                        }}
                                    ></div>
                                </div>
                            )}
                        {detailDoctor &&
                            detailDoctor.Markdown &&
                            detailDoctor.Markdown.contentHTMLEn &&
                            language === LANGUAGES.EN && (
                                <div className="detail-info">
                                    <div
                                        className="detail-doctor-content"
                                        dangerouslySetInnerHTML={{
                                            __html: detailDoctor.Markdown
                                                .contentHTMLEn,
                                        }}
                                    ></div>
                                </div>
                            )}
                        <div className="comment-doctor"></div>
                        {!_.isEmpty(detailDoctor) && <HomeFooter />}
                    </div>
                </Fragment>
            </LoadingOverlay>
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
    connect(mapStateToProps, mapDispatchToProps)(DetailDoctor)
);
