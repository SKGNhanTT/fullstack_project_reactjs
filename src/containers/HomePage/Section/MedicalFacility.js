import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';

import Slider from 'react-slick';

class MedicalFacility extends Component {
    render() {
        return (
            <div>
                <div className="section-share section-medical-facility">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">
                                Cơ sở y tế nổi bật
                            </span>
                            <button className="btn-section">Xem thêm</button>
                        </div>

                        <div className="section-body">
                            <Slider {...this.props.setting}>
                                <div className="section-customize">
                                    <div className="bg-img section-medical-facility"></div>
                                    <h3>Bệnh viện quốc tế</h3>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-img section-medical-facility"></div>
                                    <h3>Bệnh viện quốc tế</h3>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-img section-medical-facility"></div>
                                    <h3>Bệnh viện quốc tế</h3>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-img section-medical-facility"></div>
                                    <h3>Bệnh viện quốc tế</h3>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-img section-medical-facility"></div>
                                    <h3>Bệnh viện quốc tế</h3>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-img section-medical-facility"></div>
                                    <h3>Bệnh viện quốc tế</h3>
                                </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
