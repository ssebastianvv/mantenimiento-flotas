"use client"
import { signOut } from "next-auth/react";
import { icons } from "@/ui/atoms";
import styles from './sidebar.module.scss';
import { Button } from "@/ui/atoms";
import Title from "@/ui/atoms/title/Title";
import React from "react";

const SidebarItems: React.FC = () => {
    const handleSignOut = async () => {
        await signOut({
            callbackUrl: '/'
        });
    };

    return (
        <div className={styles.sidebar}>

            <div>
                <Title level={3} className={styles.title}>Transport solutions</Title>
            </div>
            <div className={styles.containerItems}>
                <div className={styles.item}>
                    <Button className="secondary-icons-big">{icons.cita} vehiculos</Button>
                </div>
                <div className={styles.item}>
                    <Button className="secondary-icons-big" onClick={handleSignOut}>{icons.exit} Cerrar sesión</Button>
                </div>

            </div>
        </div >

            )
}

            export default SidebarItems;
