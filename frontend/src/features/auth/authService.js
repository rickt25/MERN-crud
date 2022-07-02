import axiosApi from '../../config/axios.js';
import axios from 'axios';

class AuthService {
  async register(name, email, password) {
    const response = await axiosApi.post("register", {
      name,
      email,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  };
  async login(email, password) {
    const response = await axiosApi.post("login", {
      email,
      password
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  };
  async logout() {
    localStorage.removeItem("user");
  };
  async refreshAccessToken() {
    try{
      const response = await axios.get("token");
      return response.accessToken;
    }catch(error){
      console.log(error);
    }
  };
}

export default new AuthService();