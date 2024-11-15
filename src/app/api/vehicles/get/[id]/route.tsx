import { NextResponse } from "next/server";
import { VehicleService } from "@/app/infraestructure/services/project.services";

export async function GET( request: Request, {params} : {params: Promise<{id: number}>}){
    const service = new VehicleService();

    try {
        const id = (await params).id
        const response = await service.findById(id);


        return NextResponse.json(response, {status: 200});
        

    } catch (error) { 
        console.log('Error: ', error);
        return NextResponse.json({message: 'Error'}, {status: 500})
    }
}