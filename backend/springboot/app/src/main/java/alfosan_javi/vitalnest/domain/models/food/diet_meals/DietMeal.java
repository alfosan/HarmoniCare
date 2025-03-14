package alfosan_javi.vitalnest.domain.models.food.diet_meals;

import lombok.Data;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "diet_meals")
public class DietMeal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "diet_id")
    private Long dietId;

    @Column(name = "meal_id")
    private Long mealId;

    @Column(name = "day_of_week")
    private String dayOfWeek;

    @Column(name = "meal_type")
    private String mealType;

    @Column(name = "createdat")
    private LocalDateTime createdAt;

    @Column(name = "updatedat")
    private LocalDateTime updatedAt;
}