import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const get = async (serviceName) => {
  const url = process.env.REACT_APP_API_URL + serviceName;

  console.log(url);

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    return false;
  }
};

export const post = async (serviceName, datas = {}) => {
  const url = process.env.REACT_APP_API_URL + serviceName;
  try {
    const response = await axios.post(url, datas);
    return response.data;
  } catch (e) {
    return false;
  }
};
