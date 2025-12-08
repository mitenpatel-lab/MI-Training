import axios from 'axios';
import { navigateTo } from "./navigation";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});
let isRefreshing = false;
let failedRequestsQueue = [];
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        console.log("---- AXIOS ERROR ----");
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Message:", error.response?.data?.message);
        console.log("Type:", error.response?.data?.type);

        if (
            error.response &&
            error.response.status === 403 &&
            (error.response.data?.message === "Token expired" ||
                error.response.data?.type === "TOKEN_EXPIRED") &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            if (isRefreshing) {

                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = "Bearer " + token;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                const res = await axiosInstance.post("/refresh");
                ;

                const newToken = res.data.accessToken;

                localStorage.setItem("token", newToken);

                failedRequestsQueue.forEach((p) => p.resolve(newToken));
                failedRequestsQueue = [];

                originalRequest.headers["Authorization"] = "Bearer " + newToken;

                return axiosInstance(originalRequest);

            } catch (err) {
                failedRequestsQueue.forEach((p) => p.reject(err));
                failedRequestsQueue = [];

                localStorage.removeItem("token");
                navigateTo("/");
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default {
    get: axiosInstance.get,
    post: axiosInstance.post,
    put: axiosInstance.put,
    delete: axiosInstance.delete,
    axiosInstance
}

