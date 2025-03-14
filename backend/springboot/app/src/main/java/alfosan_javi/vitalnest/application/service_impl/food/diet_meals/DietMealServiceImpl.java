package alfosan_javi.vitalnest.application.service_impl.food.diet_meals;

import alfosan_javi.vitalnest.application.dto.food.diet_meals.DietMealDTO;
import alfosan_javi.vitalnest.application.services_port_in.food.diet_meals.DietMealService;
import alfosan_javi.vitalnest.domain.models.food.diet_meals.DietMeal;
import alfosan_javi.vitalnest.domain.repos_port_out.food.diet_meals.DietMealRepository;
import alfosan_javi.vitalnest.presentation.assemblers.food.diet_meals.DietMealAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DietMealServiceImpl implements DietMealService {

    @Autowired
    private DietMealRepository dietMealRepository;

    @Autowired
    private DietMealAssembler dietMealAssembler;

    @Override
    public List<DietMealDTO> getAllDietMeals() {
        return dietMealRepository.findAll().stream()
                .map(dietMealAssembler::toModel)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<DietMealDTO> getDietMealById(Long id) {
        return dietMealRepository.findById(id)
                .map(dietMealAssembler::toModel);
    }

    @Override
    public List<DietMealDTO> getDietMealsByDietId(Long dietId) {
        return dietMealRepository.findByDietId(dietId).stream()
                .map(dietMealAssembler::toModel)
                .collect(Collectors.toList());
    }

    @Override
    public DietMealDTO createDietMeal(DietMealDTO dietMealDTO) {
        DietMeal dietMeal = dietMealAssembler.toEntity(dietMealDTO);
        dietMeal.setCreatedAt(java.time.LocalDateTime.now());
        dietMeal.setUpdatedAt(java.time.LocalDateTime.now());
        DietMeal savedDietMeal = dietMealRepository.save(dietMeal);
        return dietMealAssembler.toModel(savedDietMeal);
    }

    @Override
    public DietMealDTO updateDietMeal(Long id, DietMealDTO dietMealDTO) {
        Optional<DietMeal> existingDietMeal = dietMealRepository.findById(id);
        if (existingDietMeal.isPresent()) {
            DietMeal dietMeal = existingDietMeal.get();
            dietMeal.setDietId(dietMealDTO.getDietId());
            dietMeal.setMealId(dietMealDTO.getMealId());
            dietMeal.setDayOfWeek(dietMealDTO.getDayOfWeek());
            dietMeal.setMealType(dietMealDTO.getMealType());
            dietMeal.setUpdatedAt(java.time.LocalDateTime.now());
            DietMeal updatedDietMeal = dietMealRepository.save(dietMeal);
            return dietMealAssembler.toModel(updatedDietMeal);
        }
        return null;
    }

    @Override
    public void deleteDietMeal(Long id) {
        dietMealRepository.deleteById(id);
    }
}