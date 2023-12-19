import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }

        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInforDoctor(this.props.doctorId);
        }
    }

    render() {
        let { dataProfile } = this.state;
        let { language } = this.props;

        let nameVi, nameEN;
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
            nameEN = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        }

        return (
            <Fragment>
                <div className="intro-contor">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${
                                dataProfile && dataProfile.image
                                    ? dataProfile.image
                                    : ''
                            })`,
                        }}
                    ></div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEN}
                        </div>
                        <div className="down">
                            {dataProfile.Markdown &&
                                dataProfile.Markdown.description && (
                                    <span>
                                        {dataProfile.Markdown.description}
                                    </span>
                                )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    Giá Khám:
                    {dataProfile &&
                    dataProfile.Doctor_Infor &&
                    language === LANGUAGES.VI ? (
                        <NumberFormat
                            className="currency"
                            value={
                                dataProfile.Doctor_Infor.priceTypeData.valueVi
                            }
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                    ) : (
                        ''
                    )}
                    {dataProfile &&
                    dataProfile.Doctor_Infor &&
                    language === LANGUAGES.EN ? (
                        <NumberFormat
                            className="currency"
                            value={
                                dataProfile.Doctor_Infor.priceTypeData.valueEn
                            }
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
