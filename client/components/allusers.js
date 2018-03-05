import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react';
import { fetchUsers, deleteUserThunk, updateToAdminThunk } from '../store/users.js';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.loadInitialData()
    }

    render() {
        console.log(this.props)
        let users = this.props.users
        return (
            <div className='userTablePadding indexBackground'>
                <br />
                <h1> All Users Status </h1>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>UserName</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Admin Status</Table.HeaderCell>
                            <Table.HeaderCell>Delete User</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            users.map(user => {
                                return (
                                    <Table.Row key={user.id}>
                                        <Table.Cell>{user.username}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>
                                            <Button onClick={() => this.props.updateToAdmin(user.id, { bool: !user.isAdmin })}>
                                                {user.isAdmin === true ?
                                                    <Icon color='green'
                                                        name='checkmark'
                                                        size='large' /> :
                                                    <Icon color='red'
                                                        name='cancel'
                                                        size='large'
                                                    />}
                                            </Button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button color='red' onClick={() => this.props.deleteUser(user.id)}>DELETE USER</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>

                </Table>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => ({ users })

const mapDispatchToProps = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(fetchUsers())
        },
        deleteUser(id) {
            dispatch(deleteUserThunk(id))
        },
        updateToAdmin(id, user) {
            dispatch(updateToAdminThunk(id, user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);