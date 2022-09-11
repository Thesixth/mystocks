import axios from "axios";
const token = "ccedf1qad3i6bee0t45g"
export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token
    }
})