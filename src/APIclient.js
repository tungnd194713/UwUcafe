import axios from "axios";

export default axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    // baseURL: "http://18.179.201.202:8000/api",
    headers: {
        "Content-type": "application/json"
    }
});