import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            postionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,
        };
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                postionArr: this.props.positionRedux,
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
            });
        }
    }

    handleOnchangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
            });
        }
    };

    openReviewImage = () => {
        if (this.state.previewImgUrl === '') return;
        this.setState({
            isOpen: true,
        });
    };

    render() {
        let gendes = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.postionArr;
        console.log('check state', this.state);
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        return (
            <div className="user-redux-container">
                <div className="title">User Redux</div>

                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className="col-12 text-center py-2">
                                {isLoadingGender ? 'Loading Data...' : ''}
                            </div>
                            <div className="col-6">
                                <lable>
                                    <FormattedMessage id="manage-user.email" />
                                </lable>
                                <input className="form-control" type="email" />
                            </div>
                            <div className="col-6">
                                <lable>
                                    <FormattedMessage id="manage-user.password" />
                                </lable>
                                <input
                                    className="form-control"
                                    type="password"
                                />
                            </div>
                            <div className="col-6">
                                <lable>
                                    <FormattedMessage id="manage-user.firstName" />
                                </lable>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <lable>
                                    <FormattedMessage id="manage-user.lastName" />
                                </lable>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <lable>
                                    <FormattedMessage id="manage-user.phonenumber" />
                                </lable>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <lable>
                                    <FormattedMessage id="manage-user.address" />
                                </lable>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <lable>
                                    <FormattedMessage id="manage-user.gender" />
                                </lable>
                                <select className="form-control">
                                    {gendes &&
                                        gendes.length > 0 &&
                                        gendes.map((item) => (
                                            <option key={item.id}>
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-6">
                                <lable>
                                    <FormattedMessage id="manage-user.position" />
                                </lable>
                                <select className="form-control">
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item) => (
                                            <option key={item.id}>
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-6">
                                <lable>
                                    <FormattedMessage id="manage-user.roleid" />
                                </lable>
                                <select className="form-control">
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item) => (
                                            <option key={item.id}>
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-6">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="preview-img-container">
                                    <input
                                        id="previewImg"
                                        type="file"
                                        hidden
                                        onChange={(e) =>
                                            this.handleOnchangeImage(e)
                                        }
                                    />
                                    <label
                                        htmlFor="previewImg"
                                        className="label-upload"
                                    >
                                        Tải ảnh{' '}
                                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                    </label>
                                    {this.state.previewImgUrl && (
                                        <div
                                            className="preview-image"
                                            onClick={() =>
                                                this.openReviewImage()
                                            }
                                            style={{
                                                backgroundImage: `url(${this.state.previewImgUrl})`,
                                            }}
                                        ></div>
                                    )}
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary">
                                    <FormattedMessage id="manage-user.submit" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.gender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        // rocessLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) =>
        //     dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
