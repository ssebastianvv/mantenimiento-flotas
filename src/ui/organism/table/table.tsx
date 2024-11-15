import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IGetVehiclesResponse } from "@/app/core/application/dto/gestion/gestion-response.dto";
import styles from './table.module.scss';
import Table from '@/ui/molecule/table/table';
import { Button } from "@/ui/atoms";
import PaginationProjects from "../paginations/ServicesPagination";

interface TableVehiclesProps {
    dataResponse: IGetVehiclesResponse;
    onEdit: (id: number) => void;
}

const TableVehicles: React.FC<TableVehiclesProps> = ({ dataResponse, onEdit }) => {
    const router = useRouter();
    const { data } = dataResponse;

    // Handler para eliminar el vehículo
    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este vehículo?");
        if (!confirmDelete) return;

        try {
            await fetch(`/api/vehicles/delete/${id}`, {
                method: "DELETE",
            });
            alert("Vehículo eliminado correctamente");

            router.refresh();
        } catch (error) {
            console.error("Error al eliminar el vehículo", error);
        }
    };

    // Encabezados de las columnas para la tabla
    const headers = [
        { label: "Foto", key: "photo" },  // Cambié "file" a "photo"
        { label: "Marca", key: "make" },
        { label: "Modelo", key: "model" },
        { label: "Año", key: "year" },
        { label: "Placa", key: "licensePlate" },
        { label: "Acciones", key: "actions" },
    ];

    // Formateo de los datos para la tabla
    const formatedData = data.map((vehicle) => ({
        photo: vehicle.photo,        // La foto es ahora `photo`
        make: vehicle.make,          // Marca
        model: vehicle.model,        // Modelo
        year: vehicle.year,          // Año
        licensePlate: vehicle.licensePlate, // Placa
        actions: (
            <div className={styles.actions}>
                <Button className="secondary-border" onClick={() => onEdit(vehicle.id)}>Editar</Button>
                <Button className="delete" onClick={() => handleDelete(vehicle.id)}>Eliminar</Button>
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

export default TableVehicles;
