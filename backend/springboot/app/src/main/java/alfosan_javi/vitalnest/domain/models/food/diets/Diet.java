package alfosan_javi.vitalnest.domain.models.food.diets;

import lombok.Data;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "diets")
public class Diet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_diet")
    private String nameDiet;

    @Column(name = "allergens")
    private String allergens;

    @Column(name = "isactive")
    private Boolean isActive;

    @Column(name = "healthy_scale")
    private Integer healthyScale;

    @Column(name = "calories")
    private Integer calories;

    @Column(name = "description")
    private String description;

    @Column(name = "createdat")
    private LocalDateTime createdAt;

    @Column(name = "updatedat")
    private LocalDateTime updatedAt;
}