package alfosan_javi.vitalnest.domain.repos_port_out.food.diet_meals;

import alfosan_javi.vitalnest.domain.models.food.diet_meals.DietMeal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DietMealRepository extends JpaRepository<DietMeal, Long> {
    List<DietMeal> findByDietId(Long dietId);
}