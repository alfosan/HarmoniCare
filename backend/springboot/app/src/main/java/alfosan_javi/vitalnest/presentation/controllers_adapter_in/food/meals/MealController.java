package alfosan_javi.vitalnest.presentation.controllers_adapter_in.food.meals;

import alfosan_javi.vitalnest.application.dto.food.meals.MealDTO;
import alfosan_javi.vitalnest.application.services_port_in.food.meals.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/meals")
public class MealController {

    @Autowired
    private MealService mealService;

    @GetMapping("/{id}")
    public Optional<MealDTO> getMealById(@PathVariable Long id) {
        return mealService.getMealById(id);
    }
}