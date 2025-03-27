'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/home/TypesSection/Types.module.css';
import { TypesSkeleton } from '@/components/skeletons/HomeSkeletons';
import { motion } from 'framer-motion';

export interface CoffeeItem {
    name: string;
    description: string;
    image: string;
    buttonText: string;
}

const coffeeTypes: CoffeeItem[] = [
    {
        name: "☕ Actividades",
        description: "Descubre una amplia gama de actividades diseñadas para mantener activos y entretenidos a tus seres queridos.",
        image: "https://cdn-icons-png.flaticon.com/512/12693/12693547.png",
        buttonText: "Ver Actividades"
    },
    {
        name: "🍽️ Alimentación",
        description: "Planes nutricionales personalizados y consejos de alimentación adaptados a las necesidades específicas.",
        image: "https://cdn-icons-png.freepik.com/512/4310/4310157.png",
        buttonText: "Elegir Platos"
    },
    {
        name: "🛏️ Habitaciones",
        description: "Espacios seguros y confortables diseñados pensando en el bienestar y la comodidad de tus familiares.",
        image: "https://cdn-icons-png.flaticon.com/512/3306/3306971.png",
        buttonText: "Ver Espacios"
    }
];

const CoffeeTypes = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <TypesSkeleton />;
    }

    return (
        <section className={styles.sect}>
            <motion.div
                className={styles.container}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.row_center}>
                    <motion.div
                        className={styles.col_intro}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className={styles.sect_title}>
                            🌟 Explora Nuestra Variedad de Servicios
                        </h1>
                        <p className={styles.sect_subtitle}>
                            Descubre cómo podemos ayudarte a mejorar la calidad de vida de tus seres queridos.
                        </p>
                    </motion.div>
                </div>

                <div className={styles.row_small}>
                    {coffeeTypes.map((coffee, index) => (
                        <motion.div
                            key={index}
                            className={styles.coffee}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <img
                                src={coffee.image}
                                className={styles.coffee_img}
                                alt={coffee.name}
                            />
                            <h2 className={styles.coffee_name}>{coffee.name}</h2>
                            <p className={styles.coffee_descr}>{coffee.description}</p>
                            <motion.button
                                className={styles.card_btn}
                                whileHover={{ backgroundColor: '#ff7f50', color: '#fff' }}
                                transition={{ duration: 0.3 }}
                            >
                                {coffee?.buttonText}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default CoffeeTypes;