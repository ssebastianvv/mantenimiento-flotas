import { HttpClient } from "@/app/infraestructure/untils/client-http";
import { IVehicle, IGetVehiclesResponse } from "@/app/core/application/dto/gestion/gestion-response.dto";
import { IVehicleRequest } from "@/app/core/application/dto/gestion/gestion-request.dto";

const name = "vehicles";  // Nombre del endpoint

export class VehicleService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    // Obtener la lista de vehículos con paginación
    async find(page: number, size: number): Promise<IGetVehiclesResponse> {
        try {
            const response = await this.httpClient.get<IGetVehiclesResponse>(`${name}?page=${page}&size=${size}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Obtener un vehículo por ID
    async findById(id: number): Promise<IVehicle> {
        try {
            const response = await this.httpClient.get<IVehicle>(`${name}/${id}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Crear un nuevo vehículo
    async create(body: IVehicleRequest) {
        try {
            const response = this.httpClient.post<IGetVehiclesResponse, IVehicleRequest>(`${name}`, body);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Actualizar los detalles de un vehículo existente
    async put(id: number, body: IVehicleRequest) {
        try {
            const response = this.httpClient.put<IVehicle, IVehicleRequest>(`${name}/${id}`, body);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Eliminar un vehículo
    async destroy(id: number) {
        try {
            const response = await this.httpClient.delete(`${name}/${id}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
