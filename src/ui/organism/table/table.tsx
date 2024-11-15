import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IGetProjectsResponse } from "@/app/core/application/dto/gestion/gestion-response.dto";
import { ProjectService } from "@/app/infraestructure/services/project.services";
import styles from './table.module.scss';
import Table from '@/ui/molecule/table/table';
import { Button } from "@/ui/atoms";
import PaginationProjects from "../paginations/ServicesPagination";

interface TableProjectsProps {
    dataResponse: IGetProjectsResponse;
    onEdit: (id: number) => void;
}

const TableProjects: React.FC<TableProjectsProps> = ({ dataResponse, onEdit }) => {
    const router = useRouter();
    const { data } = dataResponse;

    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este proyecto?");
        if (!confirmDelete) return;

        try {
            await fetch(`/api/projects/delete/${id}`, {
                method: "DELETE",
            });
            alert("Proyecto eliminado correctamente");

            router.refresh();
        } catch (error) {
            console.error("Error al eliminar el proyecto", error);
        }
    };

    const headers = [
        { label: "foto", key: "file" },
        { label: "marca", key: "make" },
        { label: "modelo", key: "model" },
        { label: "año", key: "year" },
        { label: "Organizador", key: "organizer" },
        { label: "Acciones", key: "actions" }
    ];

    const formatedData = data.map((project) => ({
        image: project.file,   // Aquí asumo que el proyecto tiene una propiedad `image` para la foto
        title: project.make,   // Marca
        modelo: project.model, // Modelo
        año: project.year,     // Año
        organizer: project.organizer?.name || 'Sin organizador', // Organizador (con manejo de null o undefined)
        actions: (
            <div className={styles.actions}>
                <Button className="secondary-border" onClick={() => onEdit(project.id)}>Editar</Button>
                <Button className="delete" onClick={() => handleDelete(project.id)}>Eliminar</Button>
            </div>
        ),
    }));

    return (
        <div>
            <Table headers={headers} data={formatedData} />
            <PaginationProjects data={dataResponse} />
        </div>
    );
};

export default TableProjects;
