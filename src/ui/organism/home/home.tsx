"use client"
import Paragraph from '../../atoms/paragraph/Paragraph';
import styles from './home.module.scss';
import Image from 'next/image';
import { Button } from '@/ui/atoms/botton/botton';
import { useRouter } from 'next/navigation';
import Title from '@/ui/atoms/title/Title';



const HomePage: React.FC = () => {

    const router = useRouter();


    const handleNavigation = (path: string) => {
        router.push(path);
    };



    return (
        <div className={styles.container}>
                <div className={styles.containerTitle}>
                    <div>
                    <Title level={2}>
                    Cada kilómetro recorrido es una oportunidad para mejorar, cada desafío es un paso hacia la eficiencia
                    </Title>
                    </div>                   
                </div>
            <div className={styles.containerDescription}>
              
                <div>
                    <Paragraph>
                    Transport Solutions S.A. es una empresa líder en el sector de transporte y logística en [colombia], que se ha destacado por su capacidad para ofrecer servicios eficientes y oportunos a lo largo y ancho del territorio nacional. Con una flota de más de 500 vehículos, que incluye camiones, furgonetas y vehículos de reparto, la compañía tiene un papel fundamental en el movimiento de mercancías y productos, contribuyendo al crecimiento económico y la conectividad entre diferentes regiones del país.
                    </Paragraph>
                </div>
                <div>
                    <img width={400} src="/B logo.png" alt="" />
                </div>
            </div>

        </div>

    );
}

export default HomePage;
