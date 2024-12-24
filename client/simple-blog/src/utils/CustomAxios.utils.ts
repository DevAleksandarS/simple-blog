import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/* TODO: Redefine this function so it better works with out responses */
export const sendReq = <T>(axiosParams: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

    axiosParams = {
        ...axiosParams,
        headers: {
          Authorization: import.meta.env.VITE_API_KEY,
          "Content-Type": "application/json",
        },
      };

    return axios.request<T>(axiosParams);
}