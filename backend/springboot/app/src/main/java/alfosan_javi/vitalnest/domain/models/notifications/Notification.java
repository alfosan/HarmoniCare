package alfosan_javi.vitalnest.domain.models.notifications;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_user")
    private Long idUser;

    @Column(name = "is_read")
    private Boolean isRead;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "title")
    private String title;

    @Column(name = "concept")
    private String concept;

    @Column(name = "id_payment")
    private Long idPayment;

    @Column(name = "id_activity")
    private Long idActivity;
}