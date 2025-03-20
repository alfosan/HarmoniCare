package alfosan_javi.vitalnest.domain.models.food.meals;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.Map;

@Converter
public class JsonToMapConverter implements AttributeConverter<Map<String, Boolean>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String, Boolean> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (Exception e) {
            throw new RuntimeException("Error converting map to JSON string", e);
        }
    }

    @Override
    public Map<String, Boolean> convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, new TypeReference<Map<String, Boolean>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Error converting JSON string to map", e);
        }
    }
}