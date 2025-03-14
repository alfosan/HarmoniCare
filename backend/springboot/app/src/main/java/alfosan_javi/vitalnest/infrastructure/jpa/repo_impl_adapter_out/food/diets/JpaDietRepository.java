package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.food.diets;

import alfosan_javi.vitalnest.domain.models.food.diets.Diet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaDietRepository extends JpaRepository<Diet, Long> {
}