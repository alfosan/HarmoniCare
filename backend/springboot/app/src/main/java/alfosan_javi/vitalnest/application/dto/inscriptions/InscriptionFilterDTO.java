package alfosan_javi.vitalnest.application.dto.inscriptions;

public class InscriptionFilterDTO {
    private String status;
    private String date;

    // Getters y setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}