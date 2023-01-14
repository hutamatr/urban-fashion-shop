import { useState, useCallback } from "react";
import axios from "axios";

const API = axios.create({ baseURL: "https://fakestoreapi.com/" });

const useAxios = () => {
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const [loading, setLoading] = useState({
    isLoading: false,
    loadingMessage: "",
  });

  const requestHttp = useCallback(async (requestConfig, setRequestFunc) => {
    try {
      setLoading({
        isLoading: true,
        loadingMessage: "Loading...",
      });
      const { method, url, dataReq } = requestConfig;
      const response = await API({
        method,
        url,
        data: dataReq ? dataReq : null,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.data;
      setRequestFunc(data);
    } catch (error) {
      if (error.response?.status === 400) {
        setError({
          isError: true,
          errorMessage: error.response?.data?.error,
        });
      } else if (error.response?.status === 401) {
        setError({ isError: true, errorMessage: "Unauthorized" });
      } else if (error.response?.status === 409) {
        setError({ isError: true, errorMessage: "Username Taken" });
      } else {
        setError({ isError: true, errorMessage: error.message });
      }
    }
    setLoading({ isLoading: false, loadingMessage: "" });
  }, []);

  return { requestHttp, loading, error, setError };
};

export default useAxios;
