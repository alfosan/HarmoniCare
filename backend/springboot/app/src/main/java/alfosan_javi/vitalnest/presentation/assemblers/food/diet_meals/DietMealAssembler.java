package alfosan_javi.vitalnest.presentation.assemblers.food.diet_meals;

import alfosan_javi.vitalnest.application.dto.food.diet_meals.DietMealDTO;
import alfosan_javi.vitalnest.domain.models.food.diet_meals.DietMeal;
import org.springframework.stereotype.Component;

@Component
public class DietMealAssembler {

    public DietMealDTO toModel(DietMeal dietMeal) {
        return new DietMealDTO(
            dietMeal.getId(),
            dietMeal.getDietId(),
            dietMeal.getMealId(),
            dietMeal.getDayOfWeek(),
            dietMeal.getMealType(),
            dietMeal.getCreatedAt(),
            dietMeal.getUpdatedAt()
        );
    }

    public DietMeal toEntity(DietMealDTO dietMealDTO) {
        DietMeal dietMeal = new DietMeal();
        dietMeal.setId(dietMealDTO.getId());
        dietMeal.setDietId(dietMealDTO.getDietId());
        dietMeal.setMealId(dietMealDTO.getMealId());
        dietMeal.setDayOfWeek(dietMealDTO.getDayOfWeek());
        dietMeal.setMealType(dietMealDTO.getMealType());
        dietMeal.setCreatedAt(dietMealDTO.getCreatedAt());
        dietMeal.setUpdatedAt(dietMealDTO.getUpdatedAt());
        return dietMeal;
    }
}