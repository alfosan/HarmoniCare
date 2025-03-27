'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/home/AdditionalInfo/AdditionalInfo.module.css';
import { AdditionalInfoSkeleton } from '@/components/skeletons/HomeSkeletons';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaHome, FaUserNurse, FaGamepad } from 'react-icons/fa';

const AdditionalInfo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeCard, setActiveCard] = useState<number | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const cardVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (isLoading) {
        return <AdditionalInfoSkeleton />;
    }

    const services = [
        {
            icon: <FaHeartbeat className={styles.icon} />,
            title: "Cuidado Integral",
            description: "Servicios especializados para el cuidado integral de nuestros residentes",
            image: "https://www.suacasa.es/images/suacasa-servicios-portada.jpg"
        },
        {
            icon: <FaHome className={styles.icon} />,
            title: "Instalaciones Modernas",
            description: "Instalaciones de última generación diseñadas para el máximo confort y seguridad",
            image: "https://www.eninter.com/wp-content/uploads/2024/09/elevador-para-escaleras-768x768.png"
        },
        {
            icon: <FaUserNurse className={styles.icon} />,
            title: "Personal 24/7",
            description: "Equipo profesional altamente cualificado disponible las 24 horas",
            image: "https://msolucionaretiro.com/wp-content/uploads/2024/07/atencion-personal-24-horas-7-dias.webp"
            
        },
        {
            icon: <FaGamepad className={styles.icon} />,
            title: "Actividades Terapéuticas",
            description: "Programa completo de actividades recreativas y terapéuticas personalizadas",
            image: "https://personaswip.com/modules/dbblog/views/img/post/b-blog-recreativa.jpg"
        }
    ];

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
            }}
            className={styles.container}
        >
            <h2 className={styles.sectionTitle}>Nuestros Servicios Premium</h2>
            <div className={styles.servicesGrid}>
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className={styles.serviceCard}
                        whileHover="hover"
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        onMouseEnter={() => setActiveCard(index)}
                        onMouseLeave={() => setActiveCard(null)}
                    >
                        <div className={styles.serviceIcon}>
                            {service.icon}
                        </div>
                        <motion.div 
                            className={styles.serviceImage}
                            animate={{
                                scale: activeCard === index ? 1.1 : 1,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <img src={service.image} alt={service.title} />
                        </motion.div>
                        <div className={styles.serviceContent}>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                        <motion.div
                            className={styles.serviceOverlay}
                            animate={{
                                opacity: activeCard === index ? 1 : 0,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <button className={styles.learnMore}>Saber más</button>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default AdditionalInfo;