'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/home/Banner/BannerSection.module.css';
import { BannerSkeleton } from '@/components/skeletons/HomeSkeletons';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaHandHoldingHeart, FaUserMd } from 'react-icons/fa';

const BannerSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState(0);

    const sections = [
        {
            icon: <FaHeartbeat />,
            title: "Cuidado Personalizado",
            description: "Atención única para cada paciente 💖"
        },
        {
            icon: <FaHandHoldingHeart />,
            title: "Compromiso Total",
            description: "Dedicación y empatía en cada momento 🤝"
        },
        {
            icon: <FaUserMd />,
            title: "Profesionales Expertos",
            description: "El mejor equipo a tu servicio 👨‍⚕️"
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        const sectionInterval = setInterval(() => {
            setActiveSection((prev) => (prev + 1) % sections.length);
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearInterval(sectionInterval);
        };
    }, []);

    if (isLoading) {
        return <BannerSkeleton />;
    }

    return (
        <div className={styles.banner}>
            <div className={styles.banner__overlay}>
                <motion.div 
                    className={styles.banner__container}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className={styles.banner__logo}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ duration: 1.5, type: "spring" }}
                    >
                        ✨ HC ✨
                    </motion.div>

                    <motion.h1 
                        className={styles.banner__title}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Harmoni Care
                    </motion.h1>

                    <motion.div
                        className={styles.banner__sections}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {sections.map((section, index) => (
                            <motion.div
                                key={index}
                                className={`${styles.section} ${activeSection === index ? styles.active : ''}`}
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ 
                                    x: 0, 
                                    opacity: activeSection === index ? 1 : 0.3,
                                    scale: activeSection === index ? 1.1 : 1
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={styles.section__icon}>{section.icon}</div>
                                <h3>{section.title}</h3>
                                <p>{section.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.p 
                        className={styles.banner__text}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        Cuidamos con compromiso, protegemos con innovación
                    </motion.p>

                    <motion.div 
                        className={styles.banner__buttons}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <motion.button 
                            className={`${styles.btn} ${styles.btn__primary}`}
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255,0.6)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Registrarse Ahora ✨
                        </motion.button>
                        <motion.button 
                            className={`${styles.btn} ${styles.btn__secondary}`}
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255,0.6)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Conocer Más 💫
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default BannerSection;
