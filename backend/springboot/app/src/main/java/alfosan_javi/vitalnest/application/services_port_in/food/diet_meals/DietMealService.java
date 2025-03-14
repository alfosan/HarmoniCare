package alfosan_javi.vitalnest.application.services_port_in.food.diet_meals;

import alfosan_javi.vitalnest.application.dto.food.diet_meals.DietMealDTO;

import java.util.List;
import java.util.Optional;

public interface DietMealService {
    List<DietMealDTO> getAllDietMeals();
    Optional<DietMealDTO> getDietMealById(Long id);
    DietMealDTO createDietMeal(DietMealDTO dietMealDTO);
    DietMealDTO updateDietMeal(Long id, DietMealDTO dietMealDTO);
    void deleteDietMeal(Long id);
}