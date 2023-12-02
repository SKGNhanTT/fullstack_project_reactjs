import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
    getAllUser,
    addNewUser,
    deleteUser,
    editUser,
} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
import { async } from 'q';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }

    async componentDidMount() {
        await this.getAllUser();
    }

    handleAddnewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    handleCloseAddUser = () => {
        this.setState({
            isOpenModalUser: false,
        });
    };
    handleCloseEditUser = () => {
        this.setState({
            isOpenModalEditUser: false,
        });
    };

    handleOpenEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        });
    };

    handleEditUser = async (user) => {
        let res = await editUser(user);
        try {
            if (res && res.errCode !== 0) {
                alert(res.errMessage);
            } else {
                await this.getAllUser();
                this.handleCloseEditUser();
            }
        } catch (error) {
            console.log(error);
        }
    };

    getAllUser = async () => {
        let res = await getAllUser('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrUser: res.user,
            });
        }
    };

    createNewUser = async (data) => {
        try {
            let res = await addNewUser(data);
            if (res && res.errCode !== 0) {
                alert(res.errMessage);
            } else {
                await this.getAllUser();
                this.handleCloseAddUser();
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { id: 'your id' });
            }
        } catch (error) {
            console.log(error);
        }
    };
    handleDeleteUser = async (id) => {
        try {
            let res = await deleteUser(id);
            if (res && res.errCode !== 0) {
                alert(res.errMessage);
            } else {
                this.getAllUser();
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        let arrUser = this.state.arrUser;
        return (
            <div className="user-container">
                {this.state.isOpenModalUser && (
                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        onhandleCloseAddUser={this.handleCloseAddUser}
                        className="modal-user-container"
                        onCreateNewUser={this.createNewUser}
                    />
                )}

                {this.state.isOpenModalEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        onhandleCloseEditUser={this.handleCloseEditUser}
                        className="modal-user-container"
                        onEditUser={this.handleEditUser}
                        user={this.state.userEdit}
                    />
                )}
                <div className="title text-center">Manage User List</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-2"
                        onClick={() => this.handleAddnewUser()}
                    >
                        <i className="fa-solid fa-plus"></i>
                        <span>Add new user</span>
                    </button>
                </div>
                <div className="user-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Adress</th>
                                <th>Action</th>
                            </tr>

                            {arrUser.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() =>
                                                this.handleOpenEditUser(item)
                                            }
                                        >
                                            <i className=" fa-solid fa-pencil"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() =>
                                                this.handleDeleteUser(item.id)
                                            }
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
