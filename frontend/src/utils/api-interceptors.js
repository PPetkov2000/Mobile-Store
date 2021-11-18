module.exports = function (instance) {
  instance.interceptors.request.use(
    (request) => {
      if (localStorage.getItem("userInfo")) {
        request.headers.Authorization = "Bearer " + JSON.parse(localStorage.getItem("userInfo")).token;
      }
      return request;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.message === "Network Error") {
        console.log(error);
        return Promise.reject({ message: "Server Error" });
      }
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      if (error.response.status === 401) {
        return Promise.reject({ message: "Not authorized" });
      }
      return Promise.reject(error.message);
    }
  );
};
