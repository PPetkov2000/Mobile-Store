import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listOrders } from '../../actions/orderActions'
import { Link } from 'react-router-dom'
import Paginate from '../../components/Paginate'

function OrderListScreen({ match }) {
  const dispatch = useDispatch()
  const { loading, error, orders, page, pages } = useSelector((state) => state.orderList)
  const pageNumber = match.params.pageNumber || 1

  useEffect(() => {
    dispatch(listOrders(pageNumber))
  }, [dispatch, pageNumber])

  return (
    <div className="admin__container">
      <h2>Orders</h2>
      <div className="table-wrapper">
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr style={{ height: '300px' }}>
                <td colSpan="6" style={{ paddingTop: '100px' }}>
                  <Loader />
                </td>
              </tr>
            ) : error ? (
              <tr style={{ height: '300px' }}>
                <td colSpan="6" style={{ paddingTop: '100px' }}>
                  <Message variant="danger">{error}</Message>
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.creator && order.creator.username}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td className="text-center">
                    {order.isPaid ? new Date(Number(order.paidAt)).toLocaleDateString() : <i className="fa fa-times btn-red--icon"></i>}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`} className="d-flex justify-content-center">
                      <button className="btn btn-full-width btn-blue--bordered p-0">Details</button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <Paginate page={page} pages={pages} isAdmin={true} adminPage="orderlist" />
      </div>
    </div>
  )
}

export default OrderListScreen
