import axios, { AxiosError } from 'axios';
import { NormalizedError, ErrorType } from '../types';

const baseURL = (import.meta as any).env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getFriendlyMessage = (type: ErrorType): string => {
  switch (type) {
    case "NETWORK_ERROR":
      return "Cannot connect to server. Check your internet connection or ensure backend is running.";
    case "SERVER_ERROR":
      return "Server encountered an issue. Please try again later.";
    case "CLIENT_ERROR":
      return "Request failed. Please check your input.";
    default:
      return "Unexpected error occurred.";
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let type: ErrorType = "UNKNOWN";
    let statusCode: number | null = null;
    let details = error.response?.data || error.message;

    if (!error.response) {
      type = "NETWORK_ERROR";
    } else {
      statusCode = error.response.status;
      if (statusCode >= 500) {
        type = "SERVER_ERROR";
      } else if (statusCode >= 400) {
        type = "CLIENT_ERROR";
      }
    }

    const normalizedError: NormalizedError = {
      type,
      message: getFriendlyMessage(type),
      statusCode,
      details,
      timestamp: new Date().toISOString(),
    };

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
