package alfosan_javi.vitalnest.presentation.controllers_adapter_in.food.diets;

import alfosan_javi.vitalnest.application.dto.food.diets.DietDTO;
import alfosan_javi.vitalnest.application.services_port_in.food.diets.DietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Map;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/diets")
public class DietController {

    @Autowired
    private DietService dietService;

    @GetMapping
    public List<DietDTO> getAllDiets() {
        return dietService.getAllDiets();
    }

    @GetMapping("/{id}")
    public Optional<DietDTO> getDietById(@PathVariable Long id) {
        return dietService.getDietById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<DietDTO> createDiet(@RequestBody DietDTO dietDTO) {
        DietDTO createdDiet = dietService.createDiet(dietDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDiet);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DietDTO> updateDiet(@PathVariable Long id, @RequestBody DietDTO dietDTO) {
        DietDTO updatedDiet = dietService.updateDiet(id, dietDTO);
        if (updatedDiet != null) {
            return ResponseEntity.ok(updatedDiet);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{dietId}/assign-patient")
    public ResponseEntity<DietDTO> assignPatientToDiet(@PathVariable Long dietId, @RequestBody Map<String, Long> payload) {
        Long patientId = payload.get("patientId");
        DietDTO updatedDiet = dietService.assignPatientToDiet(dietId, patientId);
        return ResponseEntity.ok(updatedDiet);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDiet(@PathVariable Long id) {
        dietService.deleteDiet(id);
        return ResponseEntity.noContent().build();
    }
}