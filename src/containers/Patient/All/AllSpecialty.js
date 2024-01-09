import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './AllSpecialty.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import _ from 'lodash';

class AllSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
            isLoadingOverlay: true,
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data,
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
        let { dataSpecialty } = this.state;
        let { language } = this.props;
        console.log('dataSpecialty', dataSpecialty);
        return (
            <Fragment>
                <LoadingOverlay
                    active={this.state.isLoadingOverlay}
                    spinner
                    text="Loading..."
                >
                    <div>
                        <HomeHeader />
                        {!_.isEmpty(dataSpecialty) && (
                            <div className="all-specialty-container">
                                <div className="des-specialty">
                                    <i
                                        className="fa-solid fa-house"
                                        onClick={() => this.handleIconBack()}
                                    ></i>{' '}
                                    /{' '}
                                    <FormattedMessage id="patient.all-specialty.all-specialty" />
                                </div>
                                {/* )} */}
                                <hr />
                                <div className="title-specialty">
                                    <FormattedMessage id="patient.all-specialty.list-specialty" />
                                </div>
                                <div>
                                    {dataSpecialty &&
                                        dataSpecialty.map((item, index) => {
                                            return (
                                                <div>
                                                    <div className="list-specialty">
                                                        <div
                                                            className="logo"
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
                        {!_.isEmpty(dataSpecialty) && <HomeFooter />}
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
    connect(mapStateToProps, mapDispatchToProps)(AllSpecialty)
);
