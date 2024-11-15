"use client";
import React from "react";
import styles from './car.module.scss';
import { icons } from '../../atoms/icons/Icons';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/app/api/auth/[...nextauth]/route'; 
import { Button } from "@/ui/atoms";
import Modal from "../modal/modal";
import ProjectForm from "../projectform/projectform";


const Car: React.FC = () => {
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


        <div className={styles.itemscontainer}>
            <Button className="primary-icons" onClick={downloadReport}>{icons.download} Descargar reporte</Button>
            <Button onClick={openModal} >{icons.companie} Agregar vehiculo </Button>
            
        </div>

        <Modal isVisible={isModalOpen} onClose={closeModal}>
            <ProjectForm closeModal={closeModal} projectID={projectID}/>
        </Modal>
    </nav>
)
}

export default Car;
