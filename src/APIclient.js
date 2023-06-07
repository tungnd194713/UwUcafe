import axios from "axios";

export default axios.create({
    baseURL: "http://18.179.201.202:8000/api",
    headers: {
        "Content-type": "application/json"
    }
});