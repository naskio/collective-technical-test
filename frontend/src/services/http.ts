import axios from "axios";


const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

export default axios.create({
    baseURL: `${URL}/api`,
    timeout: 1000,
    headers: {
        "Content-type": "application/json"
    }
});
