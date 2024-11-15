"use client";
import { ILoginRequest } from "@/app/core/application/index";
import { FormField } from "../../molecule/common/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { ErrorResponse, FieldError } from "@/app/core/application/dto/common/error-response.dto";
import { useRouter } from "next/navigation";
import {Button} from "../../atoms";
import Title from "../../atoms/title/Title";
import styles from './login.module.scss';

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('El correo es inválido')
        .required('Campo obligatorio'),
    password: yup
        .string()
        .min(8, 'La contraseña debe tener mínimo 8 caracteres')
        .required('La contraseña es obligatoria')
});

const LoginForm = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<ILoginRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema)
    });

    const router = useRouter();
    
    const handleLogin = async (data: ILoginRequest) => {
        console.log(data);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password
            });

            console.log(result);

            if (result?.error) {
                console.log('Ocurrió un error', JSON.parse(result.error));
                handleError(JSON.parse(result.error));
                return;
            }
            router.push('/dashboard/gestion');
        } catch (error) {
            console.log(error);
        }
    };

    const handleError = (error: unknown) => {
        const errorData = error as ErrorResponse;

        if (errorData && errorData.errors) {
            if (Array.isArray(errorData.errors) && "field" in errorData.errors[0]) {
                errorData.errors.forEach((fieldError) => {
                    const { field, error } = fieldError as FieldError;
                    setError(field as keyof ILoginRequest, {
                        message: error
                    });
                });
            } else if ("message" in errorData.errors[0]) {
                setError('email', {
                    message: errorData.errors[0].message,
                });
            }
        }
    };

    return (
        <div className={styles.containerForm}>
            <form onSubmit={handleSubmit(handleLogin)}>
                <Title className={styles.title} level={2}>Iniciar sesión</Title>
                
                <FormField<ILoginRequest>
                    control={control}
                    type="email"
                    label="Correo electrónico"
                    name="email"
                    error={errors.email}
                    placeholder="Ingresa tu correo"
                />

                <FormField<ILoginRequest>
                    control={control}
                    type="password"
                    label="Contraseña"
                    name="password"
                    error={errors.password}
                    placeholder="Ingresa tu contraseña"
                />

                <Button className="primary" type="submit">Iniciar sesión</Button>
            </form>
        </div>
    );
};

export default LoginForm;