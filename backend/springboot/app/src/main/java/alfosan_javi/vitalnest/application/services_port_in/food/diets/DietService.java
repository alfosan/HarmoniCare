package alfosan_javi.vitalnest.application.services_port_in.food.diets;

import alfosan_javi.vitalnest.application.dto.food.diets.DietDTO;

import java.util.List;
import java.util.Optional;

public interface DietService {
    List<DietDTO> getAllDiets();
    Optional<DietDTO> getDietById(Long id);
    DietDTO createDiet(DietDTO dietDTO);
    DietDTO updateDiet(Long id, DietDTO dietDTO);
    void deleteDiet(Long id);

    DietDTO assignPatientToDiet(Long dietId, Long patientId);
}