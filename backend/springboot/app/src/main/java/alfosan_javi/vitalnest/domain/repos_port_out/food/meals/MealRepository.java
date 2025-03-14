package alfosan_javi.vitalnest.domain.repos_port_out.food.meals;

import alfosan_javi.vitalnest.domain.models.food.meals.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRepository extends JpaRepository<Meal, Long> {
}