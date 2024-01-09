import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './AllSpecialty.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { getAllDoctor } from '../../../services/userService';
import { withRouter } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import _ from 'lodash';

class AllDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDoctor: [],
            isLoadingOverlay: true,
        };
    }

    async componentDidMount() {
        let res = await getAllDoctor();
        if (res && res.errCode === 0) {
            this.setState({
                dataDoctor: res.data,
                isLoadingOverlay: false,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}
    handleIconBack = () => {
        this.props.history.push('/home');
    };
    handleDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    };

    render() {
        let { dataDoctor } = this.state;
        console.log('dataDoctor', dataDoctor);
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
                        {!_.isEmpty(dataDoctor) && (
                            <div className="all-specialty-container">
                                <div className="des-specialty">
                                    <i
                                        className="fa-solid fa-house"
                                        onClick={() => this.handleIconBack()}
                                    ></i>{' '}
                                    /{' '}
                                    <FormattedMessage id="patient.all-specialty.all-doctor" />
                                </div>
                                {/* )} */}
                                <hr />
                                <div className="title-specialty">
                                    <FormattedMessage id="patient.all-specialty.list-doctor" />
                                </div>
                                <div>
                                    {dataDoctor &&
                                        dataDoctor.map((item, index) => {
                                            let nameEn =
                                                item.firstName +
                                                ' ' +
                                                item.lastName;
                                            let nameVi =
                                                item.lastName +
                                                ' ' +
                                                item.firstName;

                                            return (
                                                <div>
                                                    <div className="list-specialty">
                                                        <div
                                                            className="logo"
                                                            onClick={() =>
                                                                this.handleDetailDoctor(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={item.image}
                                                                alt="doctor"
                                                            />
                                                        </div>
                                                        <div
                                                            className="name-specialty"
                                                            onClick={() =>
                                                                this.handleDetailDoctor(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? nameVi
                                                                : nameEn}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )}
                        {!_.isEmpty(dataDoctor) && <HomeFooter />}
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
    connect(mapStateToProps, mapDispatchToProps)(AllDoctor)
);
