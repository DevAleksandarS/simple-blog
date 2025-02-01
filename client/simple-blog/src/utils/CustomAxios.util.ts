import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ServerRoutesEnum } from "../enums/ServerRoutes.enum";

export const sendReq = async <T>(
  axiosParams: AxiosRequestConfig,
  needsTokes: boolean = true
): Promise<AxiosResponse<T>> => {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  axios.defaults.withCredentials = true;

  const config = {
    ...axiosParams,
    headers: {
      Authorization: import.meta.env.VITE_API_KEY,
      "Content-Type": "application/json",
    },
  };

  if (needsTokes) {
    try {
      return await axios.request<T>(config);
    } catch (err: AxiosError | any) {
      if (err.response?.status === 401) {
        console.warn("Access token expired. Attempting to refresh...");

        try {
          await axios.request({
            method: "POST",
            url: ServerRoutesEnum.REFRESH_TOKEN,
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
              "Content-Type": "application/json",
            },
          });

          console.info("Token refreshed. Retrying original request...");

          return await axios.request<T>(config);
        } catch (refreshErr: AxiosError | any) {
          console.error("Failed to refresh token:", refreshErr.message);

          throw refreshErr;
        }
      } else {
        console.error("Request failed:", err.message);
        throw err;
      }
    }
  } else {
    return await axios.request<T>(config);
  }
};
