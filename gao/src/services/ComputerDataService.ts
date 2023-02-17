import apiClient from "@/http-common";
import http from "@/http-common";

class ComputerDataService {
   getAll(): Promise<any> {
    console.log("hey")
    return apiClient.get("/computers");
  }

  get(id: any): Promise<any> {
    return http.get(`/computers/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/computers", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/computers/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/computers/${id}`);
  }
}

export default new ComputerDataService();