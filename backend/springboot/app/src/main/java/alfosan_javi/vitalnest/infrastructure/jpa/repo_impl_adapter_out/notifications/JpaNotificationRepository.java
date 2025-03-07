package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.notifications;

import alfosan_javi.vitalnest.domain.models.notifications.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaNotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByIdUser(Long idUser);
}