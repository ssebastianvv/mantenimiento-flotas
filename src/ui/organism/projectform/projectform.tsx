"use client";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IProjectRequest } from "@/app/core/application/dto/projects/projects-request.dto";
import { FormField } from "@/ui/molecule/common/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from './projectform.module.scss';
import Title from "@/ui/atoms/title/Title";
import { Button } from "@/ui/atoms/botton/botton";
import { IGetProjectsResponseID } from "@/app/core/application/dto/projects/projects-response.dto";

interface IProps {
    closeModal: () => void;
    projectID?: number;
}

const projectSchema = yup.object().shape({
    title: yup
        .string()
        .required('El título del proyecto es requerido'),
    description: yup
        .string()
        .required('La descripción del proyecto es requerida'),
    startDate: yup
        .date()
        .required('La fecha de inicio es requerida'),
    endDate: yup
        .date()
        .required('La fecha de fin es requerida')
})


const ProjectForm = ({ projectID, closeModal }: IProps) => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue

    } = useForm<IProjectRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(projectSchema),
    })
// aca es donde se crea o se edita
    useEffect(() => {
        if (projectID) {
            const fetchProjectID = async () => {
                try {
                    const response = await fetch(`/api/projects/get/${projectID}`);
                    const data : IGetProjectsResponseID = await response.json();

                    const startDate = new Date(data.data.startDate).toISOString().split('T')[0];
                    const endDate = new Date(data.data.endDate).toISOString().split('T')[0];
                    
                    setValue('title', data.data.title);
                    setValue('description', data.data.description);
                    setValue('startDate', startDate as any);
                    setValue('endDate', endDate as any);

                

                } catch (error) {
                    console.log(error);
                }
            }

            fetchProjectID();
        }
    }, [projectID])


    const handleProject = async (data: IProjectRequest) => {
        if (projectID) {
            const response = await fetch(`/api/projects/update/${projectID}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            });

            console.log('Actualizado');

            if (!response) {
                console.log('Error el enviar el formulario :(');
            }

        } else {
            const response = await fetch('/api/projects/create', {
                method: 'POST',
                body: JSON.stringify(data)
            })

            if (!response) {
                console.log('Error el enviar el formulario :(');
            }
        }

        router.refresh();
        closeModal();
    }



    return (
        <form className={styles.form} onSubmit={handleSubmit(handleProject)}>
            <Title level={2} className={styles.title}>Proyectos</Title>

            <FormField<IProjectRequest>
                control={control}
                type="text"
                label="Título"
                name="title"
                error={errors.title}
                placeholder="Ingresa el título del proyecto"
            />

            <FormField<IProjectRequest>
                control={control}
                type="text"
                label="Descripción"
                name="description"
                error={errors.description}
                placeholder="Ingresa la decripción del proyecto"
            />

            <FormField<IProjectRequest>
                control={control}
                type="date"
                label="Fecha inicio"
                name="startDate"
                error={errors.startDate}
                placeholder="Ingresa la fecha de inicio del proyecto"
            />

            <FormField<IProjectRequest>
                control={control}
                type="date"
                label="Fecha fin"
                name="endDate"
                error={errors.startDate}
                placeholder="Ingresa la fecha de fin del proyecto"
            />

            <Button className="primary-big" type="submit">Enviar</Button>

        </form>
    )
}

export default ProjectForm;