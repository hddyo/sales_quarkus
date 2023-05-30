package info.sales.service;

import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import info.sales.entity.Estimate;
import info.sales.entity.EstimateDetail;
import info.sales.form.EstimateForm;
import info.sales.form.EstimateDetailForm;

@Singleton
public class EstimateService {

    @Inject
    ManageNoSharedService manageNoSharedService;

    /**
     * 見積ヘッダ DB登録
     * 
     * @param form
     */
    @Transactional
    public String add(EstimateForm form) {

        // 見積番号取得
        String estimateNo = manageNoSharedService.getEstimateNo();

        // 明細ヘッダ登録
        Estimate estimate = new Estimate(
                estimateNo,
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

        return estimateNo;
    }

    /**
     * 見積明細 DB登録
     * 
     * @param form
     */
    @Transactional
    public void addDetail(EstimateDetailForm form) {

        Estimate estimate = new Estimate();

        // 見積ID検索
        // 見積番号を元にＩＤ検索
        Optional<Estimate> optional = Estimate.findByEstimateNo(form.estimateNo());
        estimate = optional.orElseThrow(EntityNotFoundException::new);
        Long id = estimate.id;

        // DB登録
        EstimateDetail estimateDetail = new EstimateDetail(
                id,
                form.rowNo(),
                form.itemCode(),
                form.itemName(),
                form.salesQuantity(),
                form.salesUnit(),
                form.salesPrice(),
                form.salesAmount(),
                form.costPrice(),
                form.costAmount(),
                form.profit(),
                form.taxedUnit(),
                form.apply());

        estimateDetail.persist();

        return;
    }

}
