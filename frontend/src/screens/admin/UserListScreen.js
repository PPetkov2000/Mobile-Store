import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, listUsers } from "../../actions/userActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";

function UserListScreen({ history, match }) {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    dispatch(listUsers(pageNumber));
  }, [dispatch, history, successDelete, pageNumber]);

  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="admin__container">
      <h2>Users</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="table-wrapper">
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td className="text-center">
                    {user.isAdmin ? (
                      <i className="fa fa-check btn-green--icon"></i>
                    ) : (
                      <i className="fa fa-times btn-red--icon"></i>
                    )}
                  </td>
                  <td>
                    <div className="admin__actions">
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button className="btn-blue--icon">
                          <i className="fa fa-edit"></i>
                        </button>
                      </Link>
                      <button className="btn-red--icon" onClick={() => deleteHandler(user._id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} adminPage="userlist" />
        </div>
      )}
    </div>
  );
}

export default UserListScreen;
