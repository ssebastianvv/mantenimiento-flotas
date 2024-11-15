import React, { useState } from "react";
import { IGetVehiclesResponse, IVehicle } from "@/app/core/application/dto/gestion/gestion-response.dto";
import styles from './cards.module.scss';
import Card from "@/ui/molecule/card/Card";
import { icons } from "@/ui/atoms";

interface IProps {
    data: IGetVehiclesResponse[];
}

const PanelCards: React.FC<IProps> = ({ data }) => {
    // Establecer los filtros en el estado
    const [filters, setFilters] = useState({
        licensePlate: '',
        year: '',
        make: '',
        model: ''
    });

    // Inicializamos filteredData con todos los vehículos de los objetos 'data' (extraemos 'data' de cada respuesta)
    const [filteredData, setFilteredData] = useState<IVehicle[]>(data.flatMap((response) => response.data));

    // Función para manejar los cambios en los filtros
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    // Función para aplicar los filtros
    const handleFilter = () => {
        let filtered = data.flatMap((response) => response.data);  // Aplanamos el arreglo de datos para trabajar con vehículos

        if (filters.licensePlate) {
            filtered = filtered.filter((vehicle) =>
                vehicle.licensePlate.toLowerCase().includes(filters.licensePlate.toLowerCase())
            );
        }

        if (filters.year) {
            filtered = filtered.filter((vehicle) => vehicle.year.toString() === filters.year);
        }

        if (filters.make) {
            filtered = filtered.filter((vehicle) =>
                vehicle.make.toLowerCase().includes(filters.make.toLowerCase())
            );
        }

        if (filters.model) {
            filtered = filtered.filter((vehicle) =>
                vehicle.model.toLowerCase().includes(filters.model.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    // Función para limpiar los filtros
    const handleClearFilters = () => {
        setFilters({
            licensePlate: '',
            year: '',
            make: '',
            model: ''
        });
        setFilteredData(data.flatMap((response) => response.data)); // Limpiar los filtros y volver a mostrar todos los vehículos
    };

    return (
        <div>
            <div className={styles.filterContainer}>
                <div className={styles.filterItem}>
                    <label>Placa:</label>
                    <input
                        type="text"
                        name="licensePlate"
                        value={filters.licensePlate}
                        onChange={handleFilterChange}
                        placeholder="Filtrar por placa"
                    />
                </div>
                <div className={styles.filterItem}>
                    <label>Año:</label>
                    <input
                        type="text"
                        name="year"
                        value={filters.year}
                        onChange={handleFilterChange}
                        placeholder="Filtrar por año"
                    />
                </div>
                <div className={styles.filterItem}>
                    <label>Marca:</label>
                    <input
                        type="text"
                        name="make"
                        value={filters.make}
                        onChange={handleFilterChange}
                        placeholder="Filtrar por marca"
                    />
                </div>
                <div className={styles.filterItem}>
                    <label>Modelo:</label>
                    <input
                        type="text"
                        name="model"
                        value={filters.model}
                        onChange={handleFilterChange}
                        placeholder="Filtrar por modelo"
                    />
                </div>
                <div className={styles.filterActions}>
                    <button onClick={handleFilter}>Filtrar</button>
                    <button onClick={handleClearFilters}>Limpiar</button>
                </div>
            </div>

            <div className={styles.containerPanel}>
                {filteredData.map((vehicle, index) => (
                    <Card
                        key={index}
                        title={vehicle.licensePlate}
                        value={vehicle.make}
                    >
                        {icons.next}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PanelCards;
