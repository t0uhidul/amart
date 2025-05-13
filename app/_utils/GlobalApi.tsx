import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:1337/api",
});

const getCategory = () => axiosClient.get("/categories");

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => {
    return res.data.data;
  });
const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((resp) => {
    return resp.data.data;
  });

const getProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => {
    return res.data.data;
  });

const getProductByCategory = (category: string) =>
  axiosClient
    .get(`/products?filters[categories][name][$in]=${category}&populate=*`)
    .then((res) => res.data.data);

const addToCart = (data, jwt) =>
  axiosClient.post("/users-cart", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

export default {
  getCategory,
  getSliders,
  getProducts,
  getCategoryList,
  getProductByCategory,
  addToCart,
};
