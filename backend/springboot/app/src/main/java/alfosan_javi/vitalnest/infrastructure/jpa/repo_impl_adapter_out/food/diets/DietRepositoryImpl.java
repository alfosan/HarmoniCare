package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.food.diets;

import alfosan_javi.vitalnest.domain.models.food.diets.Diet;
import alfosan_javi.vitalnest.domain.repos_port_out.food.diets.DietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class DietRepositoryImpl implements DietRepository {

    @Autowired
    private JpaDietRepository jpaDietRepository;

    @Override
    public List<Diet> findAll() {
        return jpaDietRepository.findAll();
    }

    @Override
    public Optional<Diet> findById(Long id) {
        return jpaDietRepository.findById(id);
    }

    @Override
    public Diet save(Diet diet) {
        return jpaDietRepository.save(diet);
    }

    @Override
    public void deleteById(Long id) {
        jpaDietRepository.deleteById(id);
    }
}