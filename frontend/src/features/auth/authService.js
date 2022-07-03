import axiosApi from '../../config/axios.js';
import axios from 'axios';

class AuthService {
  async register(user) {
    const response = await axiosApi.post("register", {
      name: user.name,
      email: user.email,
      password: user.password,
      confirm_password: user.confirm_password
    });
    if (response.data.accessToken) {
      // TODO : localStorage is not safe! needs refactor
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
}

const authService = new AuthService();
export default authService;