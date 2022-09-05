import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listMyOrders } from '../actions/orderActions'

const UserOrders = ({ pageNumber }) => {
  const dispatch = useDispatch()
  const { loading, error, orders, page, pages } = useSelector((state) => state.orderListMy)

  useEffect(() => {
    dispatch(listMyOrders(pageNumber))
  }, [pageNumber])

  return (
    <React.Fragment>
      <h2 className="profile__title">My Orders</h2>
      <Table striped bordered hover responsive size="sm" className="profile__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th></th>
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
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td className="text-center">
                  {order.isPaid ? new Date(Number(order.paidAt)).toLocaleDateString() : <i className="fa fa-times btn-red--icon"></i>}
                </td>
                <td className="text-center">
                  <Link to={`/order/${order._id}`} className="btn btn-full-width btn-blue--bordered p-0">
                    Details
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Paginate page={page} pages={pages} paginateStr="/profile" />
    </React.Fragment>
  )
}

export default UserOrders
