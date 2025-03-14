package alfosan_javi.vitalnest.application.service_impl.food.meals;

import alfosan_javi.vitalnest.application.dto.food.meals.MealDTO;
import alfosan_javi.vitalnest.application.services_port_in.food.meals.MealService;
import alfosan_javi.vitalnest.domain.models.food.meals.Meal;
import alfosan_javi.vitalnest.domain.repos_port_out.food.meals.MealRepository;
import alfosan_javi.vitalnest.presentation.assemblers.food.meals.MealAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MealServiceImpl implements MealService {

    @Autowired
    private MealRepository mealRepository;

    @Autowired
    private MealAssembler mealAssembler;

    @Override
    public Optional<MealDTO> getMealById(Long id) {
        return mealRepository.findById(id)
                .map(mealAssembler::toModel);
    }
}