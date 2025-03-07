package alfosan_javi.vitalnest.application.dto.notifications;

import alfosan_javi.vitalnest.domain.models.notifications.Notification;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private Long id;
    private Long idUser;
    private Boolean isRead;
    private Boolean isActive;
    private String title;
    private String concept;
    private Long idPayment;
    private Long idActivity;

    public NotificationDTO(Notification notification) {
        this.id = notification.getId();
        this.idUser = notification.getIdUser();
        this.isRead = notification.getIsRead();
        this.isActive = notification.getIsActive();
        this.title = notification.getTitle();
        this.concept = notification.getConcept();
        this.idPayment = notification.getIdPayment();
        this.idActivity = notification.getIdActivity();
    }
}