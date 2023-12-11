import Axios from "axios";
import { getToken } from "./token";
import { getcompanyId, getuserId } from './data'

// Axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const api = Axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
    userId: getuserId(),
    companyId: getcompanyId(),
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + getToken();
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


export default api;
