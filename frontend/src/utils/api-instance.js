import axios from "axios";
import addInterceptors from "./api-interceptors";

const instance = axios.create({
  baseUrl: "http://localhost:6000",
  headers: { "Content-Type": "application/json" },
});

addInterceptors(instance);

export default instance;
