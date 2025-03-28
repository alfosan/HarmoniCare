package alfosan_javi.vitalnest.application.services_port_in.payments;

import alfosan_javi.vitalnest.application.dto.payments.PaymentDTO;

import java.util.List;
import java.util.Optional;

public interface PaymentService {
    List<PaymentDTO> getAllPayments();
    Optional<PaymentDTO> getPaymentById(Long id);
    PaymentDTO createPayment(PaymentDTO paymentDTO, Long userId, String email);
    List<PaymentDTO> getPaymentsByUserId(Long userId); // Nuevo método
}