import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, listUsers } from '../../actions/userActions'
import { formatDate } from '../../utils/dateFormatter'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Paginate from '../../components/Paginate'

function UserListScreen({ history, match }) {
  const dispatch = useDispatch()
  const { loading, error, users, page, pages } = useSelector((state) => state.userList)
  const { success: successDelete } = useSelector((state) => state.userDelete)
  const { success: successUpdate } = useSelector((state) => state.userUpdate)
  const pageNumber = match.params.pageNumber || 1

  useEffect(() => {
    dispatch(listUsers(pageNumber))
  }, [dispatch, history, successDelete, successUpdate, pageNumber])

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(userId))
    }
  }

  return (
    <div className="admin__container">
      <h2>Users</h2>
      <div className="table-wrapper">
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th className="text-center">CREATED</th>
              <th className="text-center">UPDATED</th>
              <th className="text-center">ADMIN</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr style={{ height: '300px' }}>
                <td colSpan="5" style={{ paddingTop: '100px' }}>
                  <Loader />
                </td>
              </tr>
            ) : error ? (
              <tr style={{ height: '300px' }}>
                <td colSpan="5" style={{ paddingTop: '100px' }}>
                  <Message variant="danger">{error}</Message>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td className="text-center">{formatDate(user.createdAt)}</td>
                  <td className="text-center">{formatDate(user.updatedAt)}</td>
                  <td className="text-center">
                    {user.isAdmin ? <i className="fa fa-check btn-green--icon"></i> : <i className="fa fa-times btn-red--icon"></i>}
                  </td>
                  <td>
                    <div className="admin__actions">
                      <Link
                        to={{
                          pathname: `/admin/user/${user._id}/edit`,
                          state: { pageNumber },
                        }}
                        className="btn-blue--icon"
                        title="Edit User"
                        aria-label="Edit User"
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                      <button className="btn-red--icon" onClick={() => deleteHandler(user._id)} title="Delete User" aria-label="Delete User">
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <Paginate page={page} pages={pages} isAdmin={true} adminPage="userlist" />
      </div>
    </div>
  )
}

export default UserListScreen
