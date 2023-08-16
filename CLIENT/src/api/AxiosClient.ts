import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import jwtDecode from "jwt-decode";

const BaseAxios = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axios.defaults.withCredentials = true
//tạo api refreshToken
const refreshToken = async () => {
  
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/user/refresh-token",
      {
        withCredentials: true,
      }
    );
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data.accessToken;
  } catch (error) {
    console.log(error);
  }
};


BaseAxios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      let date = new Date(); //Tạo ngày giờ hiện tại kiểm tra
      const storedToken = localStorage.getItem("accessToken");
      let token: string | null =
        storedToken !== null ? storedToken : null;
      if (token !== null) {
        const decodedToken: any = jwtDecode(token); // giải mã token

        if (decodedToken.exp < date.getTime() / 1000) {
          const data = await refreshToken();
          token = data;
        }
      }

      if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default BaseAxios;
