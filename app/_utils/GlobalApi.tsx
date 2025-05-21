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
    return resp.data.results;
  });

const getProducts = () =>
  axiosClient.get("/store/products/").then((res) => {
    console.log("res", res.data.results);
    return res.data.results;
  });

const getProductByCategory = (slug: string) =>
  axiosClient
    .get(`store/products/category/${slug}/`)
    .then((res) => res.data.results);

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
