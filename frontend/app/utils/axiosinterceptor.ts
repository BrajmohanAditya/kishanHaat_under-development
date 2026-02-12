import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const instance = axios.create({
  withCredentials: true, // This is crucial for sending cookies
  baseURL: API_BASE,
});

instance.interceptors.request.use(
  (config) => {
    console.log("Request Interceptor");
    // Remove localStorage token logic since backend uses httpOnly cookies
    // The cookies will be automatically sent with withCredentials: true
    return config;
  },
  (error) => {
    console.log("Request Interceptor Error", error);
    return Promise.reject(error);
  },
);

const refreshAccessToken = async () => {
  try {
    // No need to send refreshToken in body since it's in httpOnly cookie
    // Use the axios instance so baseURL and credentials are applied
    const response = await instance.post(
      `/user/refreshtoken`,
      {}, // Empty body
      { withCredentials: true },
    );

    // Backend sets new accessToken cookie automatically
    return response.data.accessToken; // This might not be needed since token is in cookie
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip token refresh on /auth routes
    const authEndpoints = ["/authentication/login", "/authentication/register"];
    const isAuthRequest = authEndpoints.some((endpoint) =>
      originalRequest.url?.includes(endpoint),
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        return instance(originalRequest);
      } catch (refreshError) {
        // console.error("Token refresh failed:", refreshError);
        // window.location.href = "/authentication/login";
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
