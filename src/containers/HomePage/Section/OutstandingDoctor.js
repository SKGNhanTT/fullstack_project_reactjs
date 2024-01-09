import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

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

    handleDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    };
    handleDetailAllDoctor = () => {
        if (this.props.history) {
            this.props.history.push(`/all-doctor`);
        }
    };

    render() {
        let allDoctor = this.state.arrDoctor;
        console.log('allDoctor', allDoctor);
        let { language } = this.props;
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div>
                <div className="section-share section-oustanding-doctor">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">
                                <FormattedMessage id="homepage.outstanding-doctor" />
                            </span>
                            <button
                                className="btn-section"
                                onClick={() => this.handleDetailAllDoctor()}
                            >
                                {' '}
                                <FormattedMessage id="homepage.more-info" />
                            </button>
                        </div>

                        <div className="section-body">
                            <Slider {...settings}>
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
                                            <div
                                                className="doctor-container"
                                                key={item.id}
                                            >
                                                <div
                                                    className="section-customize"
                                                    onClick={() =>
                                                        this.handleDetailDoctor(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <div className="outer-bg">
                                                        <div
                                                            className="bg-img section-oustanding-doctor"
                                                            style={{
                                                                backgroundImage: `url(${imageBase64})`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className="position text-center mt-2">
                                                        <h6>
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? nameVi
                                                                : nameEN}
                                                        </h6>
                                                        <span>
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? item.Markdown
                                                                      .specialtyNameVi
                                                                : item.Markdown
                                                                      .specialtyNameEn}
                                                        </span>
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);
