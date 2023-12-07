import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
        };
    }
    componentDidMount() {
        this.props.loadTopDoctor();
    }

    componentDidUpdate(prevProps, prevState, snapshop) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorRedux,
            });
        }
    }

    render() {
        let allDoctor = this.state.arrDoctor;
        let { language } = this.props;
        return (
            <div>
                <div className="section-share section-oustanding-doctor">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">
                                <FormattedMessage id="homepage.outstanding-doctor" />
                            </span>
                            <button className="btn-section">
                                {' '}
                                <FormattedMessage id="homepage.more-info" />
                            </button>
                        </div>

                        <div className="section-body">
                            <Slider {...this.props.setting}>
                                {allDoctor &&
                                    allDoctor.length > 0 &&
                                    allDoctor.map((item) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(
                                                item.image,
                                                'base64'
                                            ).toString('binary');
                                        }
                                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                        let nameEN = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                        return (
                                            <div className="doctor-container">
                                                <div className="section-customize">
                                                    <div className="outer-bg">
                                                        <div
                                                            className="bg-img section-oustanding-doctor"
                                                            style={{
                                                                backgroundImage: `url(${imageBase64})`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className="posiion text-center mt-2">
                                                        <h6>
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? nameVi
                                                                : nameEN}
                                                        </h6>
                                                        <div>
                                                            Khoa sương khớp
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
