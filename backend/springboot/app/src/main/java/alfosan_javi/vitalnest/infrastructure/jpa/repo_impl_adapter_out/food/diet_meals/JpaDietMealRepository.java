package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.food.diet_meals;

import alfosan_javi.vitalnest.domain.models.food.diet_meals.DietMeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaDietMealRepository extends JpaRepository<DietMeal, Long> {
}