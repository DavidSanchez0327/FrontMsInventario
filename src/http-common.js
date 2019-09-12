import axios from "axios";

export default axios.create({
  baseURL: "https://apigatewaytds.herokuapp.com/api_inventario",
  headers: {
    "Content-type": "application/json",
  }
});
