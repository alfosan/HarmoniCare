package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.notifications;

import alfosan_javi.vitalnest.domain.models.notifications.Notification;
import alfosan_javi.vitalnest.domain.repos_port_out.notifications.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class NotificationRepositoryImpl implements NotificationRepository {

    @Autowired
    private JpaNotificationRepository jpaNotificationRepository;

    @Override
    public List<Notification> findAll() {
        return jpaNotificationRepository.findAll();
    }

    @Override
    public Optional<Notification> findById(Long id) {
        return jpaNotificationRepository.findById(id);
    }

    @Override
    public Notification save(Notification notification) {
        return jpaNotificationRepository.save(notification);
    }

    @Override
    public void deleteById(Long id) {
        jpaNotificationRepository.deleteById(id);
    }

    @Override
    public List<Notification> findByIdUser(Long idUser) {
        return jpaNotificationRepository.findByIdUser(idUser);
    }
}