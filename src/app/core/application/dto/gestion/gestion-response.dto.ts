export interface IGetVehiclesResponse {
    statusCode: number;
    message: string;
    data: IVehicle[];
    metadata: Metadata;
}

export interface IVehicle {
    id: number;
    make: string;
    model: string;
    year: number; 
    licensePlate: string;
    photo?: string;
}

export interface Metadata {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface IGetVehicleResponseID {
    statusCode: number;
    message: string;
    data: IVehicle;
    metadata: Metadata;
}
