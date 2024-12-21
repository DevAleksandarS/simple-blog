import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

function useAxios<T>(axiosParams: AxiosRequestConfig) {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<AxiosError<T>>();
  const [loading, setLoading] = useState(true);

  const fetchData = async (params: AxiosRequestConfig<T>) => {
    params = {
      ...params,
      headers: {
        Authorization: import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json",
      },
    };

    try {
      const result = await axios.request<T>(params);
      setResponse(result.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  return { response, error, loading };
}

export default useAxios;
