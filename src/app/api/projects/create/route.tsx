import { NextResponse } from "next/server";
import { ProjectService } from "@/app/infraestructure/services/project.services";
import { IProjectRequest } from "@/app/core/application/dto/projects/projects-request.dto";

export async function POST(request: Request) {
    const service = new ProjectService();

    try {
        const body: IProjectRequest = await request.json();
        const response = await service.create(body);

        return NextResponse.json(response, {status: 200});
        
    } catch (error: unknown) {
        return NextResponse.json({message: "Error", error}, { status: 500})
    }
}