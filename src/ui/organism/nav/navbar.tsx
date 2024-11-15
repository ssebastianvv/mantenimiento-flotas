"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { NavBarItemComponent } from "@/ui/molecule";
import { Input } from "@/ui/atoms";
import styles from './nav.module.scss';
import { icons } from '../../atoms/icons/Icons';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/app/api/auth/[...nextauth]/route'; 
import Title from "@/ui/atoms/title/Title";
import { Button } from "@/ui/atoms";
import Paragraph from "@/ui/atoms/paragraph/Paragraph";
import Modal from "../modal/modal";
import ProjectForm from "../projectform/projectform";


const Navbar: React.FC = () => {
  const { data: session  } = useSession();
  const sessionUser = session as CustomSession;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectID, setProjectID] = useState<number>();


  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
      setProjectID(undefined);
  };

  const downloadReport = async () => {
    try {
        const response = await fetch('/api/projects/download');

        if (!response.ok) {
            throw new Error('No se pudo descargar el archivo');
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte-proyecto.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
    }
};

  return (
    <nav className={styles.nav}>
        <div className={styles.items}>
            <Title level={3} className={styles.title}>Gestion de vehiculos</Title>
        </div>

        <div className={styles.itemscontainer}>
            <Button className="primary-icons" onClick={downloadReport}>{icons.download} Descargar reporte</Button>
            <Button onClick={openModal} >nuevo proyecto</Button>
            <div className={styles.infoUser}>
                <img
                    className={styles.image}
                    src={sessionUser?.user.photo!}
                    alt="Foto de usuario"
                />
                <Paragraph>{session?.user?.name}</Paragraph>
            </div>
        </div>

        <Modal isVisible={isModalOpen} onClose={closeModal}>
            <ProjectForm closeModal={closeModal} projectID={projectID}/>
        </Modal>
    </nav>
)
}

export default Navbar;
