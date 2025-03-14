package alfosan_javi.vitalnest.presentation.controllers_adapter_in.food.diet_meals;

import alfosan_javi.vitalnest.application.dto.food.diet_meals.DietMealDTO;
import alfosan_javi.vitalnest.application.services_port_in.food.diet_meals.DietMealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/diet-meals")
public class DietMealController {

    @Autowired
    private DietMealService dietMealService;

    @GetMapping
    public List<DietMealDTO> getAllDietMeals() {
        return dietMealService.getAllDietMeals();
    }

    @GetMapping("/{id}")
    public Optional<DietMealDTO> getDietMealById(@PathVariable Long id) {
        return dietMealService.getDietMealById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<DietMealDTO> createDietMeal(@RequestBody DietMealDTO dietMealDTO) {
        DietMealDTO createdDietMeal = dietMealService.createDietMeal(dietMealDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDietMeal);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DietMealDTO> updateDietMeal(@PathVariable Long id, @RequestBody DietMealDTO dietMealDTO) {
        DietMealDTO updatedDietMeal = dietMealService.updateDietMeal(id, dietMealDTO);
        if (updatedDietMeal != null) {
            return ResponseEntity.ok(updatedDietMeal);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDietMeal(@PathVariable Long id) {
        dietMealService.deleteDietMeal(id);
        return ResponseEntity.noContent().build();
    }
}