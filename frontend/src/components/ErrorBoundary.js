import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  state = { error: "", errorInfo: "", hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
    this.setState({ errorInfo });
  }

  render() {
    const { hasError, errorInfo } = this.state;
    if (hasError) {
      return (
        <div className="card my-5" style={{ maxWidth: "60vw", marginInline: "auto" }}>
          <div className="card-header">
            <p>
              There was an error in loading this page.{" "}
              <span
                style={{ cursor: "pointer", color: "#0077FF" }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload this page
              </span>{" "}
            </p>
          </div>
          <div className="card-body">
            <details className="error-details">
              <summary>Click for error details</summary>
              {errorInfo && errorInfo.componentStack.toString()}
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ErrorBoundary;
