import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `b11-assn-12-home-stead-server.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;