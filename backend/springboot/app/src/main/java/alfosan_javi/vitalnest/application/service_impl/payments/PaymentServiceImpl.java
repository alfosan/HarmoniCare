package alfosan_javi.vitalnest.application.service_impl.payments;

import alfosan_javi.vitalnest.application.dto.payments.PaymentDTO;
import alfosan_javi.vitalnest.application.exceptions.payments.PaymentCreationException;
import alfosan_javi.vitalnest.application.services_port_in.payments.PaymentService;
import alfosan_javi.vitalnest.domain.models.payments.Payment;
import alfosan_javi.vitalnest.domain.repos_port_out.payments.PaymentRepository;
import alfosan_javi.vitalnest.presentation.assemblers.payments.PaymentAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentAssembler paymentAssembler;

    @Override
    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(paymentAssembler::toModel)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PaymentDTO> getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .map(paymentAssembler::toModel);
    }

    @Override
    public PaymentDTO createPayment(PaymentDTO paymentDTO, Long userId, String email) {
        if (paymentDTO.getPrice() == null || paymentDTO.getIdInscription() == null) {
            throw new PaymentCreationException("Price and idInscription are required.");
        }

        Payment payment = new Payment();
        payment.setIdUser(userId);
        payment.setEmail(email);
        payment.setCardNumber("");
        payment.setCardDate("");
        payment.setCcv("");
        payment.setState("pending");
        payment.setPaymentMethod("Stripe");
        payment.setTransactionReference(UUID.randomUUID().toString());
        payment.setPrice(paymentDTO.getPrice());
        payment.setIdInscription(paymentDTO.getIdInscription());
        payment.setIsActive(1);
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());

        Payment savedPayment = paymentRepository.save(payment);
        return paymentAssembler.toModel(savedPayment);
    }

    @Override
    public List<PaymentDTO> getPaymentsByUserId(Long userId) {
        return paymentRepository.findByIdUser(userId).stream()
                .map(paymentAssembler::toModel)
                .collect(Collectors.toList());
    }
}