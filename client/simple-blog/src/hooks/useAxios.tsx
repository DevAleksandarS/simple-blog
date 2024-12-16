import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_KEY;

function useAxios<T>(axiosParams: AxiosRequestConfig) {
  const [response, setResponse] = useState<AxiosResponse<T>>();
  const [error, setError] = useState<AxiosError<T>>();
  const [loading, setLoading] = useState(true);

  const fetchData = async (params: AxiosRequestConfig<T>) => {
    try {
      const result = await axios.request<T>(params);
      setResponse(result);
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
