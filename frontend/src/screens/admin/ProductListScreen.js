import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { deleteProduct, listProducts } from "../../actions/productActions";
import Paginate from "../../components/Paginate";

function ProductListScreen({ match, history }) {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    dispatch(listProducts("", pageNumber));
  }, [dispatch, history, successDelete, userInfo, pageNumber]);

  const deleteProductHandler = (productId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <div className="admin__container">
      <Row className="align-items-center">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-right">
          <Link to="/admin/product/create" className="btn btn-green--bordered">
            <i className="fa fa-plus"></i> Create Product
          </Link>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
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
                <th>PRICE</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
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
                      <button
                        className="btn-red--icon"
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            page={page}
            pages={pages}
            isAdmin={true}
            adminPage="productlist"
          />
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;
