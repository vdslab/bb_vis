import axios from "axios";

export class ApiService {
  // 開発環境では外部URL、本番環境（Netlify）では相対パスを使用
  static baseUrl = import.meta.env.VITE_API_HOST_URL || "";
  
  static async callGetApi(endpoint, params = {}) {
    try {
      const response = await axios.get(endpoint, {
        baseURL: ApiService.baseUrl,
        params: params,
      });
      return response.data;
    } catch (error) {
      console.error("API GET Error:", error);
      throw error;
    }
  }

  static async callPostApi(endpoint, data = {}) {
    try {
      const response = await axios.post(endpoint, data, {
        baseURL: ApiService.baseUrl,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("API POST Error:", error);
      throw error;
    }
  }

  static async callPutApi(endpoint, data = {}) {
    try {
      const response = await axios.put(endpoint, data, {
        baseURL: ApiService.baseUrl,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("API PUT Error:", error);
      throw error;
    }
  }

  static async callDeleteApi(endpoint) {
    try {
      const response = await axios.delete(endpoint, {
        baseURL: ApiService.baseUrl,
      });
      return response.data;
    } catch (error) {
      console.error("API DELETE Error:", error);
      throw error;
    }
  }
}
