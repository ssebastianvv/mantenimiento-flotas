import { NextResponse } from "next/server";
import { ProjectService } from "@/app/infraestructure/services/project.services";
import { IProjectRequest } from "@/app/core/application/dto/projects/projects-request.dto";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: number }> }) {
    const service = new ProjectService();

    try {
        const body: IProjectRequest = await request.json();
        const id = (await params).id;
        const response = await service.put(id, body);

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 })
    }
}