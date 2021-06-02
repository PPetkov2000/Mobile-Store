import React, { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) => {
        return userInfo && userInfo.isAdmin ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/forbidden", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default AdminRoute;
