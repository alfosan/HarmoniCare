package alfosan_javi.vitalnest.presentation.controllers_adapter_in.notifications;

import alfosan_javi.vitalnest.application.dto.notifications.NotificationDTO;
import alfosan_javi.vitalnest.application.services_port_in.notifications.NotificationService;
import alfosan_javi.vitalnest.application.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping
    public List<NotificationDTO> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public Optional<NotificationDTO> getNotificationById(@PathVariable Long id) {
        return notificationService.getNotificationById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<NotificationDTO> createNotification(@RequestHeader("Authorization") String token, @RequestBody NotificationDTO notificationDTO) {
        try {
            // Eliminar el prefijo 'Bearer ' y cualquier espacio innecesario
            String cleanedToken = token.replace("Bearer ", "").trim();

            // Obtén el ID del usuario desde el token JWT
            Long userId = jwtUtils.getUserIdFromJwtToken(cleanedToken);

            // Si el token no tiene el ID, arroja un error
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }

            // Establecer el idUser en el DTO
            notificationDTO.setIdUser(userId);

            // Crear la notificación
            NotificationDTO createdNotification = notificationService.createNotification(notificationDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdNotification);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        try {
            notificationService.deleteNotification(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/user")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByUser(@RequestHeader("Authorization") String token) {
        try {
            // Eliminar el prefijo 'Bearer ' y cualquier espacio innecesario
            String cleanedToken = token.replace("Bearer ", "").trim();

            // Obtén el ID del usuario desde el token JWT
            Long userId = jwtUtils.getUserIdFromJwtToken(cleanedToken);

            // Si el token no tiene el ID, arroja un error
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }

            // Llama al servicio para obtener las notificaciones del usuario
            List<NotificationDTO> notifications = notificationService.getNotificationsByUserId(userId);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }
}