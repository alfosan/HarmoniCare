package alfosan_javi.vitalnest.domain.repos_port_out.notifications;

import alfosan_javi.vitalnest.domain.models.notifications.Notification;
import java.util.List;
import java.util.Optional;

public interface NotificationRepository {
    List<Notification> findAll();
    Optional<Notification> findById(Long id);
    Notification save(Notification notification);
    void deleteById(Long id);
    List<Notification> findByIdUser(Long idUser);
}