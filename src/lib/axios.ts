import axios from "axios";
import type { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function getAxiosInstance() {
    const instance = axios.create({
        baseURL: `${BASE_URL}/api`,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    instance.interceptors.request.use(
        (config) => {
            const token = getCookie("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error),
    );

    return instance;
}
