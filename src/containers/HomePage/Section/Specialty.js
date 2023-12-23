import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';
import './Specialty.scss';
import { getAllSpecialty } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class Specialty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log('check res', res);
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data,
            });
        }
    }

    handleDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`);
        }
    };

    render() {
        let { dataSpecialty } = this.state;

        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.specialty" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.setting}>
                            {dataSpecialty &&
                                dataSpecialty.length > 0 &&
                                dataSpecialty.map((item) => {
                                    return (
                                        <div
                                            className="section-customize"
                                            key={item.id}
                                        >
                                            <div
                                                className="bg-img section-specialty"
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                    borderRadius: '5px',
                                                }}
                                                onClick={() =>
                                                    this.handleDetailSpecialty(
                                                        item
                                                    )
                                                }
                                            ></div>
                                            <h5 className="name-specialty">
                                                {item.name}
                                            </h5>
                                        </div>
                                    );
                                })}
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
