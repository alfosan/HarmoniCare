package alfosan_javi.vitalnest.presentation.assemblers.food.diets;

import alfosan_javi.vitalnest.application.dto.food.diets.DietDTO;
import alfosan_javi.vitalnest.domain.models.food.diets.Diet;
import org.springframework.stereotype.Component;

@Component
public class DietAssembler {

    public DietDTO toModel(Diet diet) {
        return new DietDTO(
            diet.getId(),
            diet.getNameDiet(),
            diet.getAllergens(),
            diet.getIsActive(),
            diet.getHealthyScale(),
            diet.getCalories(),
            diet.getDescription(),
            diet.getCreatedAt(),
            diet.getUpdatedAt()
        );
    }

    public Diet toEntity(DietDTO dietDTO) {
        Diet diet = new Diet();
        diet.setId(dietDTO.getId());
        diet.setNameDiet(dietDTO.getNameDiet());
        diet.setAllergens(dietDTO.getAllergens());
        diet.setIsActive(dietDTO.getIsActive());
        diet.setHealthyScale(dietDTO.getHealthyScale());
        diet.setCalories(dietDTO.getCalories());
        diet.setDescription(dietDTO.getDescription());
        diet.setCreatedAt(dietDTO.getCreatedAt());
        diet.setUpdatedAt(dietDTO.getUpdatedAt());
        return diet;
    }
}