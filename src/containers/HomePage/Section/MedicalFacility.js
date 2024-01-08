import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        };
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data,
            });
        }
    }

    handleDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    };
    render() {
        let { dataClinic } = this.state;
        let { language } = this.props;
        return (
            <div>
                <div className="section-share section-medical-facility">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">
                                <FormattedMessage id="homepage.medical-facilities" />
                            </span>
                            <button className="btn-section">
                                <FormattedMessage id="homepage.more-info" />
                            </button>
                        </div>

                        <div className="section-body">
                            <Slider {...this.props.setting}>
                                {dataClinic &&
                                    dataClinic.length > 0 &&
                                    dataClinic.map((item) => {
                                        return (
                                            <div
                                                className="section-customize"
                                                key={item.id}
                                            >
                                                <div
                                                    className="bg-img section-medical-facility"
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                        borderRadius: '5px',
                                                    }}
                                                    onClick={() =>
                                                        this.handleDetailClinic(
                                                            item
                                                        )
                                                    }
                                                ></div>
                                                <h6 className="name-medical">
                                                    {language === LANGUAGES.VI
                                                        ? item.nameVi
                                                        : item.nameEn}
                                                </h6>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
