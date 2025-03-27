package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.payments;

import alfosan_javi.vitalnest.domain.models.payments.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaPaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByIdUser(Long userId); // Método para obtener pagos por idUser
}