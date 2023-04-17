package info.sales.service;

import java.time.LocalDate;
import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

import info.sales.entity.Estimate;
import info.sales.form.EstimateForm;

@ApplicationScoped
public class EstimateService {

    public Estimate findById(Long id) {
        Estimate estimate = Estimate.findById(id);
        return estimate;
    }

    @Transactional
    public void addInit() {

        LocalDate date = LocalDate.now();
        Estimate estimate = new Estimate(date, "1", "2", "3",
                "4", "5", "6", "7",
                "8");
        estimate.persist();

        return;
    }

    @Transactional
    public void add(EstimateForm form) {

        Estimate estimate = new Estimate(
                form.estimateDate(),
                form.customerName(),
                form.subject(),
                form.deliveryDeadline(),
                form.deliveryLocation(),
                form.estimateExpirationDate(),
                form.responsiblePerson(),
                form.paymentCriteria(),
                form.overview());
        estimate.persist();

        return;
    }

}
