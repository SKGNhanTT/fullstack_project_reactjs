import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';

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
                    <div className="ms-title">Quản lí phòng khám</div>

                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label>Tên phòng khám bằng tiếng Anh</label>
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
                            <label>Ảnh phòng khám</label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(e) => this.handleOnchangeImage(e)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Tên phòng khám bằng tiếng Việt</label>
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
                            <label>Địa chỉ phòng khám bằng tiếng Anh</label>
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
                            <label>Địa chỉ phòng khám bằng tiếng Việt</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.addressVi}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, 'addressVi')
                                }
                            />
                        </div>
                        <div className="col-12">
                            <label>Mô tả phòng khám bằng tiếng Anh</label>
                            <MdEditor
                                style={{ height: '400px' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChange1}
                                value={this.state.descriptionMarkdownEn}
                            />
                        </div>
                        <div className="col-12">
                            <label>Mô tả phòng khám bằng tiếng Việt</label>
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
                                Save
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
