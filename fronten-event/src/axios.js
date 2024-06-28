import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "./context/authcontext";
import { useContext } from "react";

const instance = axios.create({
    baseURL : 'http://localhost:8000/',
    headers : {
        'X-CSRFToken': Cookies.get('csrftoken')
    }
})

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        const authContext = useContext(AuthContext);
        authContext.logout();
      }
      return Promise.reject(error);
    }
  );

export default instance