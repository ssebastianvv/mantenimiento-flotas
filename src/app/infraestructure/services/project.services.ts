import { HttpClient } from "@/app/infraestructure/untils/client-http";
import { Datum, IGetProjectsResponse } from "@/app/core/application/dto/gestion/gestion-response.dto";
import { IProjectRequest } from "@/app/core/application/dto/gestion/gestion-request.dto";


const name ="vehicles"  // tener en cuenta esto es el nombre (de lo que se tiene en postman para manejar el endpoint)
export class ProjectService{
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async find(page: number, size: number): Promise<IGetProjectsResponse> {
        try {
            const response = await this.httpClient.get<IGetProjectsResponse>(`${name}?page=${page}&size=${size}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findById(id: number): Promise<Datum> {
        try {
            const response = await this.httpClient.get<Datum>(`${name}/${id}`);
            return response;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async create(body: IProjectRequest) {
        try {
            const response = this.httpClient.post<IGetProjectsResponse, IProjectRequest>(`${name}`, body);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async put(id: number, body: IProjectRequest) {
		try {
			const response = this.httpClient.put<Datum, IProjectRequest>(`${name}/${id}`, body);
			return response;

		} catch (error) {
			console.log(error);
			throw error;
		}
	}
    

    async destroy(id: number){
        try {
            const response = await this.httpClient.delete(`${name}/${id}`);
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }


}