import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
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

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
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

    handleSaveNewSpecialTy = async () => {
        let res = await createNewSpecialty(this.state);

        if (res && res.errCode === 0) {
            toast.success('Create new specialty succeed!');
        } else {
            toast.error('Create failed!');
        }
    };

    render() {
        return (
            <Fragment>
                <div className="manage-specialty-container">
                    <div className="ms-title">Quản lí chuyên khoa</div>

                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label>Tên chuyên khoa</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, 'name')
                                }
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Ảnh chuyên khoa</label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(e) => this.handleOnchangeImage(e)}
                            />
                        </div>
                        <div className="col-12">
                            <MdEditor
                                style={{ height: '400px' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-save-specialty"
                                onClick={() => this.handleSaveNewSpecialTy()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
