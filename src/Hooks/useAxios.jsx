import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://b11-assn-12-home-stead-server.vercel.app`
    // baseURL: `http://localhost:3000/`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;