import { useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = "https://fakestoreapi.com/";

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
      const response = await axios({
        method: requestConfig.method,
        url: `${BASE_URL}${requestConfig.url}`,
        data: requestConfig.data ? requestConfig.data : null,
        headers: requestConfig.headers
          ? {
              "Content-Type": "application/json",
            }
          : {},
      });

      const data = await response.data;
      setRequestFunc(data);
    } catch (error) {
      if (!error?.response) {
        setError({ isError: true, errorMessage: "No Server Response" });
      } else if (error.response?.status === 400) {
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

  return { requestHttp, loading, error };
};

export default useAxios;
