import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';
import './Specialty.scss';

class Specialty extends React.Component {
    render() {
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            Chuyên Khoa Phổ Biến
                        </span>
                        <button className="btn-section">Xem thêm</button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.setting}>
                            <div className="section-customize">
                                <div className="bg-img section-specialty"></div>
                                <h3>Cơ xương khớp</h3>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img section-specialty"></div>
                                <h3>Cơ xương khớp</h3>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img section-specialty"></div>
                                <h3>Cơ xương khớp</h3>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img section-specialty"></div>
                                <h3>Cơ xương khớp</h3>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img section-specialty"></div>
                                <h3>Cơ xương khớp</h3>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img section-specialty"></div>
                                <h3>Cơ xương khớp</h3>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
