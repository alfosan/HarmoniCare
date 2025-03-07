package alfosan_javi.vitalnest.application.services_port_in.notifications;

import alfosan_javi.vitalnest.application.dto.notifications.NotificationDTO;

import java.util.List;
import java.util.Optional;

public interface NotificationService {
    List<NotificationDTO> getAllNotifications();
    Optional<NotificationDTO> getNotificationById(Long id);
    NotificationDTO createNotification(NotificationDTO notificationDTO);
    void deleteNotification(Long id);
    List<NotificationDTO> getNotificationsByUserId(Long idUser);
}