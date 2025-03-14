package alfosan_javi.vitalnest.application.dto.food.meals;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MealDTO {
    private Long id;
    private String img;
    private String name;
    private String calories;
    private String carbohydrates;
    private String proteins;
    private String fats;
}