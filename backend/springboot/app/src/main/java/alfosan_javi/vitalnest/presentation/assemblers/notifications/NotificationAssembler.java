package alfosan_javi.vitalnest.presentation.assemblers.notifications;

import alfosan_javi.vitalnest.application.dto.notifications.NotificationDTO;
import alfosan_javi.vitalnest.domain.models.notifications.Notification;
import org.springframework.stereotype.Component;

@Component
public class NotificationAssembler {
    public Notification toEntity(NotificationDTO dto) {
        Notification notification = new Notification();
        notification.setId(dto.getId());
        notification.setIdUser(dto.getIdUser());
        notification.setIsRead(dto.getIsRead() != null ? dto.getIsRead() : false); // Valor predeterminado
        notification.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true); // Valor predeterminado
        notification.setTitle(dto.getTitle());
        notification.setConcept(dto.getConcept());
        notification.setIdPayment(dto.getIdPayment());
        notification.setIdActivity(dto.getIdActivity());
        return notification;
    }

    public NotificationDTO toModel(Notification entity) {
        return new NotificationDTO(
            entity.getId(),
            entity.getIdUser(),
            entity.getIsRead(),
            entity.getIsActive(),
            entity.getTitle(),
            entity.getConcept(),
            entity.getIdPayment(),
            entity.getIdActivity()
        );
    }
}