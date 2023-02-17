import apiClient from "@/http-common";

class ComputerDataService {
   getAll(pagination : number): Promise<any> {
    console.log("hey")
    return apiClient.get(`/computers/?page=${pagination}`);
  }

  get(id: any): Promise<any> {
    return apiClient.get(`/computers/${id}`);
  }

  create(data: any): Promise<any> {
    return apiClient.post("/computers", data);
  }

  update(id: any, data: any): Promise<any> {
    return apiClient.put(`/computers/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return apiClient.delete(`/computers/${id}`);
  }
}

export default new ComputerDataService();