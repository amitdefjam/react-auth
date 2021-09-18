import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const { response } = error;
  console.log(response);

  /* If server not responding */
  if (!response) {
    toast.error("Bad Connection to server");
  }

  /* any error  */
  if (response && response.status >= 403) {
    toast.error("Unexpected error has been occurred");
  }

  return Promise.reject(error);
});

export function setHeader(header, value) {
  axios.defaults.headers.common[header] = value;
}

const axiosService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
  setHeader,
};

export default axiosService;
