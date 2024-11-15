"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Title from '../../atoms/title/Title'; 
import { Button } from '../../atoms/botton/botton'; 
import styles from './header.module.scss'; 

const Header: React.FC = () => {
  const router = useRouter();

 
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header className={styles.header}>
      {/* Nombre de la empresa */}
      <Title level={1} className={styles.title}>
        Transport solutions S.A
      </Title>

      {/* Contenedor de los botones */}
      <div className={styles.buttonsContainer}>
        <Button className={styles.button1} onClick={() => handleNavigation('/register')}>
          Registrarse
        </Button>
        <Button className={styles.button2} onClick={() => handleNavigation('/login')}>
          Iniciar sesión
        </Button>
      </div>
    </header>
  );
};

export default Header;
