package info.sales.form;

import java.time.LocalDate;

public record EstimateForm(
        LocalDate estimateDate,
        String customerName,
        String subject,
        String deliveryDeadline,
        String deliveryLocation,
        String estimateExpirationDate,
        String responsiblePerson,
        String paymentCriteria,
        String overview) {
}