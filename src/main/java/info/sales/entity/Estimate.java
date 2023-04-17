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
    @Column(name = "estimate_date")
    public LocalDate estimateDate;
    @Column(name = "customer_name")
    public String customerName;
    @Column(name = "subject")
    public String subject;
    @Column(name = "delivery_deadline")
    public String deliveryDeadline;
    @Column(name = "delivery_location")
    public String deliveryLocation;
    @Column(name = "estimate_expiration_date")
    public String estimateExpirationDate;
    @Column(name = "responsible_person")
    public String responsiblePerson;
    @Column(name = "payment_criteria")
    public String paymentCriteria;
    @Column(name = "overview")
    public String overview;

    public Estimate() {
    }

    public Estimate(LocalDate estimateDate, String customerName, String subject, String deliveryDeadline,
            String deliveryLocation, String estimateExpirationDate, String responsiblePerson, String paymentCriteria,
            String overview) {
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