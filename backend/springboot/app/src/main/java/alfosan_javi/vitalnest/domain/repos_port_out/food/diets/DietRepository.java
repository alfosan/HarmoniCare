package alfosan_javi.vitalnest.domain.repos_port_out.food.diets;

import alfosan_javi.vitalnest.domain.models.food.diets.Diet;
import java.util.List;
import java.util.Optional;

public interface DietRepository {
    List<Diet> findAll();
    Optional<Diet> findById(Long id);
    Diet save(Diet diet);
    void deleteById(Long id);
}