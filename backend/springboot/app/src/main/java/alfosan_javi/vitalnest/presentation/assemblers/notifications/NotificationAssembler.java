package alfosan_javi.vitalnest.presentation.assemblers.notifications;

import alfosan_javi.vitalnest.application.dto.notifications.NotificationDTO;
import alfosan_javi.vitalnest.domain.models.notifications.Notification;
import org.springframework.stereotype.Component;

@Component
public class NotificationAssembler {

    public NotificationDTO toModel(Notification notification) {
        return new NotificationDTO(
            notification.getId(),
            notification.getIdUser(),
            notification.getIsRead(),
            notification.getIsActive(),
            notification.getTitle(),
            notification.getConcept(),
            notification.getIdPayment(),
            notification.getIdActivity()
        );
    }

    public Notification toEntity(NotificationDTO notificationDTO) {
        Notification notification = new Notification();
        notification.setId(notificationDTO.getId());
        notification.setIdUser(notificationDTO.getIdUser());
        notification.setIsRead(notificationDTO.getIsRead());
        notification.setIsActive(notificationDTO.getIsActive());
        notification.setTitle(notificationDTO.getTitle());
        notification.setConcept(notificationDTO.getConcept());
        notification.setIdPayment(notificationDTO.getIdPayment());
        notification.setIdActivity(notificationDTO.getIdActivity());
        return notification;
    }
}