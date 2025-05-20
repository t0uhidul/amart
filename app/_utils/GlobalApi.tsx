import axios from "axios";

const Base_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
if (!Base_URL) {
  throw new Error(
    "NEXT_PUBLIC_BACKEND_BASE_URL is not defined in the environment variables"
  );
}

const axiosClient = axios.create({
  baseURL: Base_URL,
});

// const getCategory = () => axiosClient.get("/categories");

const getCategoryList = () =>
  axiosClient.get("/store/categories/").then((res) => {
    // console.log("resp", res);
    return res.data.results;
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
  // getCategory,
  getSliders,
  getProducts,
  getCategoryList,
  getProductByCategory,
  addToCart,
};
