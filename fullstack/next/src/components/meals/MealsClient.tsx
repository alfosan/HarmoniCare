"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "@/styles/shop/shop.module.css";
import Slide from "@/components/meals/Slide";
import Filters from "@/components/meals/Filters";
import Meals from "@/components/meals/Meals";
import FiltersMeals from "@/components/meals/FiltersMeals";

const filterColors = [
    { id: 1, color: "#C1E1C1", name: "Desayunos" },
    { id: 2, color: "#F0D5A8", name: "Comidas" },
    { id: 3, color: "#E6C3C3", name: "Meriendas" },
    { id: 4, color: "#D4E6E6", name: "Cenas" },
    { id: 5, color: "#E8D1DC", name: "Postres" },
];

export default function MealsClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [activeFilter, setActiveFilter] = useState<number | null>(null);
    const [activeFilterColor, setActiveFilterColor] = useState<string>("");
    const [maxCalories, setMaxCalories] = useState<number>(600);
    const [allergens, setAllergens] = useState<string[]>([]);
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        const queryFilter = searchParams.get("type_meal");
        if (queryFilter) {
            const filterId = parseInt(queryFilter, 10);
            setActiveFilter(filterId);
            const filter = filterColors.find(f => f.id === filterId);
            if (filter) setActiveFilterColor(filter.color);
        }
    }, [searchParams]);

    const handleFilterChange = (id: number, color: string) => {
        setActiveFilter(id);
        setActiveFilterColor(color);
        router.push(`?type_meal=${id}`, { scroll: false });
    };

    const handleCaloriesFilterChange = (min: number, max: number) => {
        setMaxCalories(max);
    };

    const handleAllergensFilterChange = (selectedAllergens: string[]) => {
        setAllergens(selectedAllergens);
    };

    const handleRoleFilterChange = (selectedRole: string) => {
        setRole(selectedRole);
    };

    const getTypeMeal = () => {
        switch (activeFilter) {
            case 1: return "desayuno";
            case 2: return "comida";
            case 3: return "merienda";
            case 4: return "cena";
            case 5: return "postre";
            default: return "";
        }
    };

    return (
        <div className={styles.shop} style={{ backgroundColor: activeFilterColor }}>
            <Filters onFilterChange={handleFilterChange} />
            <Slide activeFilter={activeFilter} activeFilterColor={activeFilterColor} onFilterChange={handleFilterChange} />
            <FiltersMeals 
                onCaloriesFilterChange={handleCaloriesFilterChange} 
                onAllergensFilterChange={handleAllergensFilterChange} 
                onRoleFilterChange={handleRoleFilterChange} 
            />
            <Meals 
                typeMeal={getTypeMeal()} 
                minCalories={0} 
                maxCalories={maxCalories} 
                allergens={allergens} 
                role={role} 
            />
        </div>
    );
}