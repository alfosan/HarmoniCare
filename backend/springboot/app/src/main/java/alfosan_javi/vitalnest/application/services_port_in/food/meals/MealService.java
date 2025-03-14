package alfosan_javi.vitalnest.application.services_port_in.food.meals;

import alfosan_javi.vitalnest.application.dto.food.meals.MealDTO;

import java.util.Optional;

public interface MealService {
    Optional<MealDTO> getMealById(Long id);
}