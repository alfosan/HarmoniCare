package alfosan_javi.vitalnest.domain.repos_port_out.food.diet_meals;

import alfosan_javi.vitalnest.domain.models.food.diet_meals.DietMeal;
import java.util.List;
import java.util.Optional;

public interface DietMealRepository {
    List<DietMeal> findAll();
    Optional<DietMeal> findById(Long id);
    DietMeal save(DietMeal dietMeal);
    void deleteById(Long id);
}