package alfosan_javi.vitalnest.presentation.controllers_adapter_in.payments;

import alfosan_javi.vitalnest.application.dto.payments.PaymentDTO;
import alfosan_javi.vitalnest.application.services_port_in.payments.PaymentService;
import alfosan_javi.vitalnest.application.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping
    public List<PaymentDTO> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Optional<PaymentDTO> getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    @PostMapping
    public PaymentDTO createPayment(@RequestBody PaymentDTO paymentDTO, HttpServletRequest request) {
        String token = jwtUtils.getJwtFromRequest(request);
        Long userId = jwtUtils.getUserIdFromJwtToken(token);
        String email = jwtUtils.getUserEmailFromToken(token);
        return paymentService.createPayment(paymentDTO, userId, email);
    }
}