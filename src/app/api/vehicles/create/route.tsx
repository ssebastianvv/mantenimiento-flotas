import { NextResponse } from "next/server";
import { VehicleService } from "@/app/infraestructure/services/project.services";
import { IVehicleRequest } from "@/app/core/application/dto/gestion/gestion-request.dto";

export async function POST(request: Request) {
    const service = new VehicleService();

    try {
        const body: IVehicleRequest = await request.json();
        const response = await service.create(body);

        return NextResponse.json(response, {status: 200});
        
    } catch (error: unknown) {
        return NextResponse.json({message: "Error", error}, { status: 500})
    }
}