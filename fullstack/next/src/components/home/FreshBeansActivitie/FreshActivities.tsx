'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/home/FreshBeansActivitie/FreshActivities.module.css';
import { FreshActivitiesSkeleton } from '@/components/skeletons/HomeSkeletons';
import { FaHeartbeat, FaBrain, FaUsers, FaCalendarCheck } from 'react-icons/fa';

const FreshActivities = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState(0);

    const activities = [
        {
            icon: <FaHeartbeat />,
            title: "Actividades Físicas",
            description: "Ejercicios adaptados y terapias de movimiento para mantener una vida activa y saludable."
        },
        {
            icon: <FaBrain />,
            title: "Estimulación Cognitiva",
            description: "Juegos de memoria, puzzles y actividades que mantienen la mente ágil y activa."
        },
        {
            icon: <FaUsers />,
            title: "Socialización",
            description: "Eventos grupales y actividades sociales para fomentar las conexiones significativas."
        },
        {
            icon: <FaCalendarCheck />,
            title: "Rutinas Diarias",
            description: "Programas estructurados que proporcionan estabilidad y propósito cada día."
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        const sectionInterval = setInterval(() => {
            setActiveSection((prev) => (prev + 1) % activities.length);
        }, 4000);

        return () => {
            clearTimeout(timer);
            clearInterval(sectionInterval);
        };
    }, []);

    if (isLoading) {
        return <FreshActivitiesSkeleton />;
    }
    
    return (
        <motion.div 
            className={styles.half_sect}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className={styles.half_first}>
                <motion.div 
                    className={styles.description}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <h2 className={styles.description_title}>
                        <motion.span
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            ✨ Actividades Vitales
                        </motion.span>
                    </h2>
                    <p className={styles.description_p}>
                        Transformamos el cuidado en experiencias enriquecedoras que nutren cuerpo, mente y espíritu.
                    </p>
                    
                    <div className={styles.activities_grid}>
                        {activities.map((activity, index) => (
                            <motion.div
                                key={index}
                                className={`${styles.activity_card} ${activeSection === index ? styles.active : ''}`}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ 
                                    scale: activeSection === index ? 1 : 0.95,
                                    opacity: activeSection === index ? 1 : 0.7
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={styles.icon_wrapper}>
                                    {activity.icon}
                                </div>
                                <h3>{activity.title}</h3>
                                <p>{activity.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className={styles.cta_container}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href="#" className={styles.btn}>
                            Descubrir Más 
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
            
            <motion.div 
                className={styles.half_second}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <div className={styles.floating_images}>
                    <motion.img
                        src="/activities/activity1.jpg"
                        alt="Actividad 1"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    />
                    <motion.img
                        src="/activities/activity2.jpg"
                        alt="Actividad 2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FreshActivities;