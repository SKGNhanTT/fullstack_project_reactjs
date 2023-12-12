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
            selectedDoctor: {},
            description: '',
            listDoctor: [],
            hasOldData: false,

            // save doctor infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
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
            data.map((item) => {
                let object = {};
                let labelVi =
                    type === 'USERS'
                        ? `${item.lastName} ${item.firstName}`
                        : item.valueVi;
                let labelEn =
                    type === 'USERS'
                        ? `${item.firstName} ${item.lastName}`
                        : item.valueEn;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                res.push(object);
            });
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
            let dataSelect = this.builDataInputSelect(this.props.allDoctor);
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (
            prevProps.allRequiredDoctorInfor !==
            this.props.allRequiredDoctorInfor
        ) {
            let { resPayment, resPrice, resProvince } =
                this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.builDataInputSelect(resPrice);
            let dataSelectPayment = this.builDataInputSelect(resPayment);
            let dataSelectProvince = this.builDataInputSelect(resProvince);

            this.setState({
                listPayment: dataSelectPayment,
                listPrice: dataSelectPrice,
                listProvince: dataSelectProvince,
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
        });
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: {},
            description: '',
            hasOldData: false,
        });
    };

    handleChangeSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInfoDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            });
        }
    };

    handleChangeDes = (e) => {
        this.setState({
            description: e.target.value,
        });
    };

    render() {
        let { listPrice, listPayment, listProvince } = this.state;

        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info ">
                    <div className="content-left col-4 from-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelectDoctor}
                            options={this.state.listDoctor}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className="content-right col-8">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.infor" />
                        </label>
                        <textarea
                            className="form-control"
                            onChange={(e) => this.handleChangeDes(e)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="doctor-info-individual row">
                    <div className="col-4 from-group">
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelectDoctor}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá...'}
                        />
                    </div>
                    <div className="col-4 from-group">
                        <label>Chọn Phương thức thanh toán</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelectDoctor}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán...'}
                        />
                    </div>
                    <div className="col-4 from-group">
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelectDoctor}
                            options={this.state.listProvince}
                            placeholder={'Chọn tỉnh thành...'}
                        />
                    </div>
                </div>
                <div className="doctor-info-individual row">
                    <div className="col-4 from group">
                        <label>Tên phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 from group">
                        <label>Địa chỉ phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 from group">
                        <label>Note</label>
                        <input className="form-control" />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '280px' }}
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
