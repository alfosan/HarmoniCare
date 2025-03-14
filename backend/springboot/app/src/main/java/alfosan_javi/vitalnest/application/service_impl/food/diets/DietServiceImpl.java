package alfosan_javi.vitalnest.application.service_impl.food.diets;

import alfosan_javi.vitalnest.application.dto.food.diets.DietDTO;
import alfosan_javi.vitalnest.application.services_port_in.food.diets.DietService;
import alfosan_javi.vitalnest.domain.models.food.diets.Diet;
import alfosan_javi.vitalnest.domain.repos_port_out.food.diets.DietRepository;
import alfosan_javi.vitalnest.presentation.assemblers.food.diets.DietAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DietServiceImpl implements DietService {

    @Autowired
    private DietRepository dietRepository;

    @Autowired
    private DietAssembler dietAssembler;

    @Override
    public List<DietDTO> getAllDiets() {
        return dietRepository.findAll().stream()
                .map(dietAssembler::toModel)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<DietDTO> getDietById(Long id) {
        return dietRepository.findById(id)
                .map(dietAssembler::toModel);
    }

    @Override
    public DietDTO createDiet(DietDTO dietDTO) {
        Diet diet = dietAssembler.toEntity(dietDTO);
        diet.setCreatedAt(java.time.LocalDateTime.now());
        diet.setUpdatedAt(java.time.LocalDateTime.now());
        Diet savedDiet = dietRepository.save(diet);
        return dietAssembler.toModel(savedDiet);
    }

    @Override
    public DietDTO updateDiet(Long id, DietDTO dietDTO) {
        Optional<Diet> existingDiet = dietRepository.findById(id);
        if (existingDiet.isPresent()) {
            Diet diet = existingDiet.get();
            diet.setNameDiet(dietDTO.getNameDiet());
            diet.setAllergens(dietDTO.getAllergens());
            diet.setIsActive(dietDTO.getIsActive());
            diet.setHealthyScale(dietDTO.getHealthyScale());
            diet.setCalories(dietDTO.getCalories());
            diet.setDescription(dietDTO.getDescription());
            diet.setUpdatedAt(java.time.LocalDateTime.now());
            Diet updatedDiet = dietRepository.save(diet);
            return dietAssembler.toModel(updatedDiet);
        }
        return null;
    }

    @Override
    public void deleteDiet(Long id) {
        dietRepository.deleteById(id);
    }
}