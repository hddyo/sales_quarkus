package info.sales.entity;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "estimate")
public class Estimate extends PanacheEntityBase {

    @Id
    @SequenceGenerator(name = "estimate_id_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(name = "estimate_no")
    public String estimateNo;
    @Column(name = "estimate_date")
    public LocalDate estimateDate;
    @Column(name = "customer_name", nullable = true)
    public String customerName;
    @Column(name = "subject", nullable = true)
    public String subject;
    @Column(name = "delivery_deadline", nullable = true)
    public String deliveryDeadline;
    @Column(name = "delivery_location", nullable = true)
    public String deliveryLocation;
    @Column(name = "estimate_expiration_date", nullable = true)
    public String estimateExpirationDate;
    @Column(name = "responsible_person", nullable = true)
    public String responsiblePerson;
    @Column(name = "payment_criteria", nullable = true)
    public String paymentCriteria;
    @Column(name = "overview", nullable = true)
    public String overview;

    public Estimate() {
    }

    public Estimate(String estimateNo, LocalDate estimateDate, String customerName, String subject,
            String deliveryDeadline, String deliveryLocation, String estimateExpirationDate,
            String responsiblePerson, String paymentCriteria, String overview) {
        this.estimateNo = estimateNo;
        this.estimateDate = estimateDate;
        this.customerName = customerName;
        this.subject = subject;
        this.deliveryDeadline = deliveryDeadline;
        this.deliveryLocation = deliveryLocation;
        this.estimateExpirationDate = estimateExpirationDate;
        this.responsiblePerson = responsiblePerson;
        this.paymentCriteria = paymentCriteria;
        this.overview = overview;
    }

}