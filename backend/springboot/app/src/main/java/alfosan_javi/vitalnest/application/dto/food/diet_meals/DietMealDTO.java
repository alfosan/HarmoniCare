package alfosan_javi.vitalnest.application.dto.food.diet_meals;

import alfosan_javi.vitalnest.domain.models.food.diet_meals.DietMeal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DietMealDTO {
    private Long id;
    private Long dietId;
    private Long mealId;
    private String dayOfWeek;
    private String mealType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public DietMealDTO(DietMeal dietMeal) {
        this.id = dietMeal.getId();
        this.dietId = dietMeal.getDietId();
        this.mealId = dietMeal.getMealId();
        this.dayOfWeek = dietMeal.getDayOfWeek();
        this.mealType = dietMeal.getMealType();
        this.createdAt = dietMeal.getCreatedAt();
        this.updatedAt = dietMeal.getUpdatedAt();
    }
}