import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:1337/api",
});

const getCategory = () => axiosClient.get("/categories");
const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((resp) => {
    return resp.data.data;
  });

export default {
  getCategory,
  getSliders,
};
