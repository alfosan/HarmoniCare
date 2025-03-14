package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.food.diet_meals;

import alfosan_javi.vitalnest.domain.models.food.diet_meals.DietMeal;
import alfosan_javi.vitalnest.domain.repos_port_out.food.diet_meals.DietMealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class DietMealRepositoryImpl implements DietMealRepository {

    @Autowired
    private JpaDietMealRepository jpaDietMealRepository;

    @Override
    public List<DietMeal> findAll() {
        return jpaDietMealRepository.findAll();
    }

    @Override
    public Optional<DietMeal> findById(Long id) {
        return jpaDietMealRepository.findById(id);
    }

    @Override
    public DietMeal save(DietMeal dietMeal) {
        return jpaDietMealRepository.save(dietMeal);
    }

    @Override
    public void deleteById(Long id) {
        jpaDietMealRepository.deleteById(id);
    }
}