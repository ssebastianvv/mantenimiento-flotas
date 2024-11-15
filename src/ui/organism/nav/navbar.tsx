"use client";
import React from "react";
import { useSession } from 'next-auth/react'; 
import { CustomSession } from '@/app/api/auth/[...nextauth]/route'; 
import Title from "@/ui/atoms/title/Title";
import styles from './nav.module.scss';


const Navbar: React.FC = () => {

  return (
    <nav className={styles.nav}>
        <div className={styles.items}>
            <Title level={3} className={styles.title}>Gestion de vehiculos</Title>
        </div>
    </nav>
  );
};

export default Navbar;
