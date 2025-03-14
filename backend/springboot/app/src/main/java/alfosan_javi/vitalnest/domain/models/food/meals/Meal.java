package alfosan_javi.vitalnest.domain.models.food.meals;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "meals")
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "img")
    private String img;

    @Column(name = "name")
    private String name;

    @Column(name = "calories")
    private String calories;

    @Column(name = "carbohydrates")
    private String carbohydrates;

    @Column(name = "proteins")
    private String proteins;

    @Column(name = "fats")
    private String fats;
}