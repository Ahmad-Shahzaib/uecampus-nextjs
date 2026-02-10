import axios from "axios";
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// console.log("API BASE URL:", process.env.NEXT_PUBLIC_BASE_URL);

export function getAxiosInstance() {
    const instance = axios.create({
        // If NEXT_PUBLIC_BASE_URL is not set, fall back to relative /api (Next.js app routes)
        baseURL: BASE_URL ? `${BASE_URL}/api` : "/api",
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

    // Lightweight retry with exponential backoff for transient errors (network/5xx)
    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const config = error.config as (InternalAxiosRequestConfig & { __retryCount?: number });
            const status = error.response?.status;

            const isNetworkOr5xx =
                !status || (status >= 500 && status < 600);

            if (!config) {
                return Promise.reject(error);
            }

            config.__retryCount = config.__retryCount ?? 0;
            const maxRetries = 2;

            if (isNetworkOr5xx && config.__retryCount < maxRetries) {
                config.__retryCount += 1;
                const delayMs = Math.min(1500 * 2 ** (config.__retryCount - 1), 4000);
                await new Promise((r) => setTimeout(r, delayMs));
                return instance(config);
            }

            return Promise.reject(error);
        },
    );

    return instance;
}
