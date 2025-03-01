package alfosan_javi.vitalnest.application.exceptions.payments;

public class PaymentCreationException extends RuntimeException {
    public PaymentCreationException(String message) {
        super(message);
    }
}