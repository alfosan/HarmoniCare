package alfosan_javi.vitalnest.presentation.assemblers.food.meals;

import alfosan_javi.vitalnest.application.dto.food.meals.MealDTO;
import alfosan_javi.vitalnest.domain.models.food.meals.Meal;
import org.springframework.stereotype.Component;

@Component
public class MealAssembler {

    public MealDTO toModel(Meal meal) {
        return new MealDTO(meal.getId(), meal.getImg(), meal.getName(), meal.getCalories(), meal.getCarbohydrates(), meal.getProteins(), meal.getFats());
    }

    public Meal toEntity(MealDTO mealDTO) {
        Meal meal = new Meal();
        meal.setId(mealDTO.getId());
        meal.setImg(mealDTO.getImg());
        meal.setName(mealDTO.getName());
        meal.setCalories(mealDTO.getCalories());
        meal.setCarbohydrates(mealDTO.getCarbohydrates());
        meal.setProteins(mealDTO.getProteins());
        meal.setFats(mealDTO.getFats());
        return meal;
    }
}