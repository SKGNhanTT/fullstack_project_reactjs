import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // save markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctor: [],
            hasOldData: false,

            // save doctor infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getRequiredDoctorInfor();
    }

    builDataInputSelect = (data, type) => {
        let res = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            if (type === 'USERS') {
                data.map((item) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;

                    let labelEn = `${item.firstName} ${item.lastName}`;

                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    res.push(object);
                });
            }
            if (type === 'PRICE') {
                data.map((item) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;

                    let labelEn = `${item.valueEn} USD`;

                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    res.push(object);
                });
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;

                    let labelEn = `${item.valueEn}`;

                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    res.push(object);
                });
            }
            if (type === 'SPECIALTY') {
                data.map((item) => {
                    let object = {};
                    // let labelVi = `${item.valueVi}`;

                    // let labelEn = `${item.valueEn}`;

                    // object.label =
                    //     language === LANGUAGES.VI ? labelVi : labelEn;
                    // object.value = item.keyMap;
                    object.label = item.name;
                    object.value = item.id;
                    res.push(object);
                });
            }

            if (type === 'CLINIC') {
                data.map((item) => {
                    let object = {};
                    // let labelVi = `${item.valueVi}`;

                    // let labelEn = `${item.valueEn}`;

                    // object.label =
                    //     language === LANGUAGES.VI ? labelVi : labelEn;
                    // object.value = item.keyMap;
                    object.label = item.name;
                    object.value = item.id;
                    res.push(object);
                });
            }
        }

        return res;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.builDataInputSelect(
                this.props.allDoctor,
                'USERS'
            );
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.builDataInputSelect(
                this.props.allDoctor,
                'USERS'
            );
            let dataPrice = this.builDataInputSelect(
                this.props.allRequiredDoctorInfor.resPrice,
                'PRICE'
            );
            let dataPayment = this.builDataInputSelect(
                this.props.allRequiredDoctorInfor.resPayment,
                'PAYMENT'
            );
            let dataProvince = this.builDataInputSelect(
                this.props.allRequiredDoctorInfor.resProvince,
                'PROVINCE'
            );
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataPrice,
                listPayment: dataPayment,
                listProvince: dataProvince,
            });
        }
        if (
            prevProps.allRequiredDoctorInfor !==
            this.props.allRequiredDoctorInfor
        ) {
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
                this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.builDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.builDataInputSelect(
                resPayment,
                'PAYMENT'
            );
            let dataSelectProvince = this.builDataInputSelect(
                resProvince,
                'PROVINCE'
            );
            let dataSelectSpecialty = this.builDataInputSelect(
                resSpecialty,
                'SPECIALTY'
            );
            let dataSelectClinic = this.builDataInputSelect(
                resClinic,
                'CLINIC'
            );

            this.setState({
                listPayment: dataSelectPayment,
                listPrice: dataSelectPrice,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CRETAE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId:
                this.state.selectedClinic && this.state.selectedClinic.value
                    ? this.state.selectedClinic.value
                    : '',
            specialtyId: this.state.selectedSpecialty.value
                ? this.state.selectedSpecialty.value
                : '',
        });

        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            hasOldData: false,
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        });
    };

    handleChangeSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let {
            listPayment,
            listPrice,
            listProvince,
            listSpecialty,
            listClinic,
        } = this.state;

        let res = await getDetailInfoDoctor(selectedDoctor.value);
        let priceId = '',
            provinceId = '',
            paymentId = '',
            addressClinic = '',
            nameClinic = '',
            note = '',
            specialtyId = '',
            clinicId = '';

        if (res && res.errCode === 0 && res.data.Markdown) {
            let markdown = res.data.Markdown;

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;

                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                let selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                });
                let selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                });
                let selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId;
                });

                let selectedSpecialty = listSpecialty.find((item) => {
                    return item && item.value === clinicId;
                });
                let selectedClinic = listClinic.find((item) => {
                    return item && item.value === specialtyId;
                });

                this.setState({
                    contentHTML: markdown.contentHTML,
                    contentMarkdown: markdown.contentMarkdown,
                    description: markdown.description,
                    hasOldData: true,
                    selectedPrice: selectedPrice,
                    selectedProvince: selectedProvince,
                    selectedPayment: selectedPayment,
                    addressClinic: addressClinic,
                    nameClinic: nameClinic,
                    note: note,
                    selectedSpecialty: selectedSpecialty,
                    selectedClinic: selectedClinic,
                });
            } else {
                this.setState({
                    contentHTML: '',
                    contentMarkdown: '',
                    description: '',
                    hasOldData: false,
                    priceId: '',
                    provinceId: '',
                    paymentId: '',
                    addressClinic: '',
                    nameClinic: '',
                    note: note,
                    selectedPrice: '',
                    selectedProvince: '',
                    selectedPayment: '',
                    selectedSpecialty: '',
                    selectedClinic: '',
                });
            }
        } else {
            this.setState({
                ccontentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                priceId: '',
                provinceId: '',
                paymentId: '',
                addressClinic: '',
                nameClinic: '',
                note: note,
                selectedPrice: '',
                selectedProvince: '',
                selectedPayment: '',
                selectedSpecialty: '',
                selectedClinic: '',
            });
        }
    };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        });
    };

    handleChangeText = (e, id) => {
        let stateCopy = { ...this.setState };
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    render() {
        let { listPrice, listPayment, listProvince } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info row">
                    <div className="col-4 content-left from-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelectDoctor}
                            options={this.state.listDoctor}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select-doctor" />
                            }
                        />
                    </div>
                    <div className="content-right col-8">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.infor" />
                        </label>
                        <textarea
                            className="form-control"
                            onChange={(e) =>
                                this.handleChangeText(e, 'description')
                            }
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="doctor-info-individual row">
                    <div className="col-4 from-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.price" />
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.price" />
                            }
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 from-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.payment" />
                            }
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-4 from-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.province" />
                            }
                            name="selectedProvince"
                        />
                    </div>
                </div>
                <div className="doctor-info-individual row">
                    <div className="col-4 from group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.nameClinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(e) =>
                                this.handleChangeText(e, 'nameClinic')
                            }
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 from group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.addressClinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(e) =>
                                this.handleChangeText(e, 'addressClinic')
                            }
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-4 from group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(e) => this.handleChangeText(e, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className="doctor-info-individual row">
                    <div className="col-4 from-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.specialty" />
                        </label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.specialty" />
                            }
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className="col-4 from-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-clinic" />
                        </label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select-clinic" />
                            }
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '240px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={
                        this.state.hasOldData
                            ? 'save-content-doctor'
                            : 'create-content-doctor'
                    }
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {this.state.hasOldData
                        ? 'Save information'
                        : 'Create information'}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getRequiredDoctorInfor: () =>
            dispatch(actions.getRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
