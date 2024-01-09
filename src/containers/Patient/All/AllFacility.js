import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './AllFacility.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import _ from 'lodash';

class AllFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFacility: [],
            isLoadingOverlay: true,
        };
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataFacility: res.data,
                isLoadingOverlay: false,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}
    handleIconBack = () => {
        this.props.history.push('/home');
    };
    handleDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`);
        }
    };

    render() {
        let { dataFacility } = this.state;
        console.log('all clinic', getAllClinic);
        let { language } = this.props;
        return (
            <Fragment>
                <LoadingOverlay
                    active={this.state.isLoadingOverlay}
                    spinner
                    text="Loading..."
                >
                    <div>
                        <HomeHeader />
                        {!_.isEmpty(dataFacility) && (
                            <div className="all-specialty-container">
                                <div className="des-specialty">
                                    <i
                                        className="fa-solid fa-house"
                                        onClick={() => this.handleIconBack()}
                                    ></i>{' '}
                                    /{' '}
                                    <FormattedMessage id="patient.all-specialty.all-clinic" />
                                </div>
                                {/* )} */}
                                <hr />
                                <div className="title-specialty">
                                    <FormattedMessage id="patient.all-specialty.list-clinic" />
                                </div>
                                <div>
                                    {dataFacility &&
                                        dataFacility.map((item, index) => {
                                            return (
                                                <div>
                                                    <div className="list-specialty">
                                                        <div
                                                            className="logo-facility"
                                                            onClick={() =>
                                                                this.handleDetailSpecialty(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={item.image}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div
                                                            className="name-specialty"
                                                            onClick={() =>
                                                                this.handleDetailSpecialty(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? item.nameVi
                                                                : item.nameEn}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )}
                        {!_.isEmpty(dataFacility) && <HomeFooter />}
                    </div>
                </LoadingOverlay>
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AllFacility)
);
