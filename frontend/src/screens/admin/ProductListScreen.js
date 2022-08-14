import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { deleteProduct, listProducts } from '../../actions/productActions'
import Paginate from '../../components/Paginate'

function ProductListScreen({ match, history }) {
  const dispatch = useDispatch()
  const { loading, error, products, page, pages } = useSelector((state) => state.productList)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = useSelector((state) => state.productDelete)
  const pageNumber = match.params.pageNumber || 1

  useEffect(() => {
    dispatch(listProducts('', pageNumber))
  }, [history, successDelete, pageNumber])

  const deleteProductHandler = (productId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(productId))
    }
  }

  return (
    <div className="admin__container">
      <div className="admin__header">
        <h2>Products</h2>
        <Link to="/admin/product/create" className="btn btn-green--bordered">
          <i className="fa fa-plus"></i> Create Product
        </Link>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      <div className="table-wrapper">
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>BRAND</th>
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
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.brand}</td>
                  <td>
                    <div className="admin__actions">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className="btn-blue--icon">
                          <i className="fa fa-edit"></i>
                        </button>
                      </Link>
                      <button className="btn-red--icon" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <Paginate page={page} pages={pages} isAdmin={true} adminPage="productlist" />
      </div>
    </div>
  )
}

export default ProductListScreen
