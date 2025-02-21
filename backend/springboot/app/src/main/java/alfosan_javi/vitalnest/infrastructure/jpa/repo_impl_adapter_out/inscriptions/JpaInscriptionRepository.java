package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.inscriptions;

import alfosan_javi.vitalnest.domain.models.inscriptions.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaInscriptionRepository extends JpaRepository<Inscription, Long> {
    List<Inscription> findByIdUser(Long idUser);

    @Query("SELECT i FROM Inscription i WHERE i.idUser = :idUser " +
           "AND (:status IS NULL OR i.state = :status) " +
           "AND (:date IS NULL OR TO_CHAR(i.createdAt, 'YYYY-MM-DD') = :date)")
    List<Inscription> findByIdUserAndFilters(@Param("idUser") Long idUser,
                                             @Param("status") String status,
                                             @Param("date") String date);
}