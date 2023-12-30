import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';

class HandBook extends React.Component {
    render() {
        return (
            <div className="section-share section-HandBook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cẩm nang</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.setting}>
                            <div className="section-customize">
                                <div className="bg-img section-HandBook"></div>
                                <h6 className="name-handbook">Cơ xương khớp</h6>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img section-HandBook"></div>
                                <h6 className="name-handbook">Cơ xương khớp</h6>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img section-HandBook"></div>
                                <h6 className="name-handbook">Cơ xương khớp</h6>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img section-HandBook"></div>
                                <h6>Cơ xương khớp</h6>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img section-HandBook"></div>
                                <h6 className="name-handbook">Cơ xương khớp</h6>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img section-HandBook"></div>
                                <h6 className="name-handbook">Cơ xương khớp</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
