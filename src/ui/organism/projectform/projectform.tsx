"use client";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IVehicleRequest } from "@/app/core/application/dto/gestion/gestion-request.dto";  
import { FormField } from "@/ui/molecule/common/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from './vehicleform.module.scss'; 
import Title from "@/ui/atoms/title/Title";
import { Button } from "@/ui/atoms/botton/botton";
import { IGetVehicleResponseID } from "@/app/core/application/dto/gestion/gestion-response.dto";  

interface IProps {
    closeModal: () => void;
    vehicleID?: number;  
}

const vehicleSchema = yup.object().shape({
    make: yup
        .string()
        .required('La marca del vehículo es requerida'),
    model: yup
        .string()
        .required('El modelo del vehículo es requerido'),
    year: yup
        .number()
        .required('El año del vehículo es requerido')
        .min(1900, 'El año debe ser mayor a 1900'),
    licensePlate: yup
        .string()
        .required('La matrícula del vehículo es requerida'),
    photo: yup
        .string()
        .url('La foto debe ser una URL válida'),
});

const VehicleForm = ({ vehicleID, closeModal }: IProps) => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<IVehicleRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(vehicleSchema),
    });

    // Cargar los datos del vehículo cuando se edita
    useEffect(() => {
        if (vehicleID) {
            const fetchVehicle = async () => {
                try {
                    const response = await fetch(`/api/vehicles/get/${vehicleID}`);
                    const data: IGetVehicleResponseID = await response.json();

                    const vehicle = data.data;  // Ajustamos el tipo de datos a vehículo

                    setValue('make', vehicle.make);
                    setValue('model', vehicle.model);
                    setValue('year', vehicle.year);
                    setValue('licensePlate', vehicle.licensePlate);
                    setValue('photo', vehicle.file || '');
                } catch (error) {
                    console.log(error);
                }
            };

            fetchVehicle();
        }
    }, [vehicleID, setValue]);

    // Manejo de creación o actualización de vehículos
    const handleVehicle = async (data: IVehicleRequest) => {
        if (vehicleID) {
            // Actualizar vehículo
            const response = await fetch(`/api/vehicles/update/${vehicleID}`, {
                method: 'PATCH',
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Vehículo actualizado');
            } else {
                console.log('Error al actualizar el vehículo');
            }
        } else {
            // Crear vehículo
            const response = await fetch('/api/vehicles/create', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Vehículo creado');
            } else {
                console.log('Error al crear el vehículo');
            }
        }

        router.refresh();
        closeModal();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleVehicle)}>
            <Title level={2} className={styles.title}>Vehículo</Title>

            <FormField<IVehicleRequest>
                control={control}
                type="text"
                label="Marca"
                name="make"
                error={errors.make}
                placeholder="Ingresa la marca del vehículo"
            />

            <FormField<IVehicleRequest>
                control={control}
                type="text"
                label="Modelo"
                name="model"
                error={errors.model}
                placeholder="Ingresa el modelo del vehículo"
            />

            <FormField<IVehicleRequest>
                control={control}
                type="number"
                label="Año"
                name="year"
                error={errors.year}
                placeholder="Ingresa el año del vehículo"
            />

            <FormField<IVehicleRequest>
                control={control}
                type="text"
                label="Matrícula"
                name="licensePlate"
                error={errors.licensePlate}
                placeholder="Ingresa la matrícula del vehículo"
            />

            <FormField<IVehicleRequest>
                control={control}
                type="text"
                label="Foto"
                name="photo"
                error={errors.photo}
                placeholder="Ingresa la URL de la foto del vehículo"
            />

            <Button className="primary-big" type="submit">Enviar</Button>
        </form>
    );
};

export default VehicleForm;
