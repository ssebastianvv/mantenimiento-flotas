import React from "react";
import Paragraph from "@/ui/atoms/paragraph/Paragraph";
import Title from "@/ui/atoms/title/Title";
import styles from './card.module.scss';


interface PanelCardProps {
    title: string;
    value: number | string;
    children: React.ReactNode;
}

const Card: React.FC<PanelCardProps> = ({ title, value, children }) => {
    return (
        <div className={styles.card}>
            <div className={styles.headerCard}>
                <div>
                    <Title level={5}>{title}</Title>
                </div>
                <div>
                    {children}
                </div>
            </div>
            <Title level={3}>{value}</Title>
        </div>
    );
};

export default Card;
