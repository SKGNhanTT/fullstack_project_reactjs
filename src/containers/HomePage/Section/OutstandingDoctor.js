import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';

class OutstandingDoctor extends Component {
    render() {
        return (
            <div>
                <div className="section-share section-oustanding-doctor">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">
                                Bác sĩ nổi bật tuần qua
                            </span>
                            <button className="btn-section">Xem thêm</button>
                        </div>

                        <div className="section-body">
                            <Slider {...this.props.setting}>
                                <div className="section-customize">
                                    <div className="outer-bg">
                                        <div className="bg-img section-oustanding-doctor"></div>
                                    </div>
                                    <div className="posiion text-center">
                                        <h3>Giáo sư tiến sĩ</h3>
                                        <div>Khoa sương khớp</div>
                                    </div>
                                </div>
                                <div className="section-customize">
                                    <div className="outer-bg">
                                        <div className="bg-img section-oustanding-doctor"></div>
                                    </div>
                                    <div className="posiion text-center">
                                        <h3>Giáo sư tiến sĩ</h3>
                                        <div>Khoa sương khớp</div>
                                    </div>
                                </div>
                                <div className="section-customize">
                                    <div className="outer-bg">
                                        <div className="bg-img section-oustanding-doctor"></div>
                                    </div>
                                    <div className="posiion text-center">
                                        <h3>Giáo sư tiến sĩ</h3>
                                        <div>Khoa sương khớp</div>
                                    </div>
                                </div>
                                <div className="section-customize">
                                    <div className="outer-bg">
                                        <div className="bg-img section-oustanding-doctor"></div>
                                    </div>
                                    <div className="posiion text-center">
                                        <h3>Giáo sư tiến sĩ</h3>
                                        <div>Khoa sương khớp</div>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
