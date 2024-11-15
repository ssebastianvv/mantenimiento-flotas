import { NextResponse } from "next/server";
import { ProjectService } from "@/app/infraestructure/services/project.services";

export async function DELETE(_: Request, {params} : {params: Promise<{id: number}>}) {
    const client = new ProjectService();

    try {
        const id = (await params).id
        await client.destroy(id);

        return NextResponse.json({message: 'Eliminado'}, {status: 200});

    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({message: 'Error'}, {status: 500})
        
    }
}