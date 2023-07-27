import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v4/driver/";

class DriverService {
  saveDriver(driver) {
    return axios.post(USER_API_BASE_URL + "add", driver);
  }

  getDriver() {
    return axios.get(USER_API_BASE_URL + "get");
  }

  getDriverByEmail(email) {
    return axios.get(USER_API_BASE_URL + "get/"+ email);
  }

  deleteDriver(id, driver) {
    return axios.delete(USER_API_BASE_URL + "del/" + id, driver);
  }

  updateDriver(id, driver) {
    return axios.put(USER_API_BASE_URL + "edit/" + id, driver);
  }

  loginDriverWithEmailAndPassword(driver) {
    return axios.post(USER_API_BASE_URL + "login", driver);
  }
}

export default new DriverService();