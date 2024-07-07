import axios, { AxiosInstance } from "axios";

export default class Request {
  private instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:5500/",
      withCredentials: true,
    });
  }

  async get(endpoint: string, params = {}, config = {}) {
    try {
      const response = await this.instance.get(endpoint, {
        ...config,
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
