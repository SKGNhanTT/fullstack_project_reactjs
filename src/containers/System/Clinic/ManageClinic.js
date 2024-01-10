import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameEn: '',
            nameVi: '',
            addressEn: '',
            addressVi: '',
            imageBase64: '',
            descriptionHTMLEn: '',
            descriptionHTMLVi: '',
            descriptionMarkdownEn: '',
            descriptionMarkdownVi: '',
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleEditorChange1 = ({ html, text }) => {
        this.setState({
            descriptionMarkdownEn: text,
            descriptionHTMLEn: html,
        });
    };
    handleEditorChange2 = ({ html, text }) => {
        this.setState({
            descriptionMarkdownVi: text,
            descriptionHTMLVi: html,
        });
    };

    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.toBase64(file);

            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success('Create new specialty succeed!');
            this.setState({
                nameEn: '',
                nameVi: '',
                addressEn: '',
                addressVi: '',
                imageBase64: '',
                descriptionHTMLEn: '',
                descriptionHTMLVi: '',
                descriptionMarkdownEn: '',
                descriptionMarkdownVi: '',
            });
        } else {
            toast.error('Create failed!');
        }
    };

    render() {
        return (
            <Fragment>
                <div className="manage-specialty-container">
                    <div className="ms-title">
                        <FormattedMessage id="manage-clinic.title" />
                    </div>

                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-clinic.nameEn" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.nameEn}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, 'nameEn')
                                }
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-clinic.image" />
                            </label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(e) => this.handleOnchangeImage(e)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-clinic.nameVi" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.nameVi}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, 'nameVi')
                                }
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-clinic.addressEn" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.addressEn}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, 'addressEn')
                                }
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-clinic.addressVi" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.addressVi}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, 'addressVi')
                                }
                            />
                        </div>
                        <div className="col-12 editer">
                            <label>
                                <FormattedMessage id="manage-clinic.desEn" />
                            </label>
                            <MdEditor
                                style={{ height: '400px' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChange1}
                                value={this.state.descriptionMarkdownEn}
                            />
                        </div>
                        <div className="col-12 editer">
                            <label>
                                <FormattedMessage id="manage-clinic.desVi" />
                            </label>
                            <MdEditor
                                style={{ height: '400px' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChange2}
                                value={this.state.descriptionMarkdownVi}
                            />
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-save-specialty"
                                onClick={() => this.handleSaveNewClinic()}
                            >
                                <FormattedMessage id="manage-clinic.save" />
                            </button>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
