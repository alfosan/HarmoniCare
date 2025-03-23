package alfosan_javi.vitalnest.application.dto.food.diets;

import alfosan_javi.vitalnest.domain.models.food.diets.Diet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DietDTO {
    private Long id;
    private String nameDiet;
    private String allergens;
    private Boolean isActive;
    private Integer healthyScale;
    private Integer calories;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long patientId;

    public DietDTO(Diet diet) {
        this.id = diet.getId();
        this.nameDiet = diet.getNameDiet();
        this.allergens = diet.getAllergens();
        this.isActive = diet.getIsActive();
        this.healthyScale = diet.getHealthyScale();
        this.calories = diet.getCalories();
        this.description = diet.getDescription();
        this.createdAt = diet.getCreatedAt();
        this.updatedAt = diet.getUpdatedAt();
        this.patientId = diet.getPatientId();
    }
}