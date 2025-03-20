package alfosan_javi.vitalnest.domain.models.food.meals;

import lombok.Data;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.Map;

@Data
@Entity
@Table(name = "meals")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
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

    @Column(name = "allergens", columnDefinition = "json")
    @Convert(converter = JsonToMapConverter.class)
    private Map<String, Boolean> allergens;
}