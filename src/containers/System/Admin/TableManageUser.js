import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        };
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers,
            });
        }
    }

    handleDelete = (id) => {
        this.props.deletaAUserRedux(id);
    };

    hanldeEditUser = (user) => {
        this.props.handleUserEditFromUserRedux(user);
    };

    render() {
        return (
            <div className="user-table mt-3 mx-1">
                <table id="table-manage-user">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Adress</th>
                            <th>Action</th>
                        </tr>
                        {this.state.usersRedux &&
                            this.state.usersRedux.map((item) => (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() =>
                                                this.hanldeEditUser(item)
                                            }
                                        >
                                            <i className=" fa-solid fa-pencil"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() =>
                                                this.handleDelete(item.id)
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deletaAUserRedux: (id) => dispatch(actions.deletaAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
