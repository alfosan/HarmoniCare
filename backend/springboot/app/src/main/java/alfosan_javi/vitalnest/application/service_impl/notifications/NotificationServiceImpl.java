package alfosan_javi.vitalnest.application.service_impl.notifications;

import alfosan_javi.vitalnest.application.dto.notifications.NotificationDTO;
import alfosan_javi.vitalnest.application.services_port_in.notifications.NotificationService;
import alfosan_javi.vitalnest.domain.models.notifications.Notification;
import alfosan_javi.vitalnest.domain.repos_port_out.notifications.NotificationRepository;
import alfosan_javi.vitalnest.presentation.assemblers.notifications.NotificationAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationAssembler notificationAssembler;

    @Override
    public List<NotificationDTO> getAllNotifications() {
        return notificationRepository.findAll().stream()
                .map(notificationAssembler::toModel)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<NotificationDTO> getNotificationById(Long id) {
        return notificationRepository.findById(id)
                .map(notificationAssembler::toModel);
    }

    @Override
    public NotificationDTO createNotification(NotificationDTO notificationDTO) {
        Notification notification = notificationAssembler.toEntity(notificationDTO);
        Notification savedNotification = notificationRepository.save(notification);
        return notificationAssembler.toModel(savedNotification);
    }

    @Override
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    @Override
    public List<NotificationDTO> getNotificationsByUserId(Long idUser) {
        return notificationRepository.findByIdUser(idUser).stream()
                .map(notificationAssembler::toModel)
                .collect(Collectors.toList());
    }
}