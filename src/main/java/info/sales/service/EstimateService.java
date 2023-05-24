package info.sales.service;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.transaction.Transactional;
import info.sales.entity.Estimate;
import info.sales.entity.EstimateDetail;
import info.sales.form.EstimateForm;
import info.sales.mapper.ManageNoMapper;
import info.sales.form.EstimateDetailForm;

@Singleton
public class EstimateService {

    @Inject
    ManageNoMapper mapper;

    /**
     * 見積ヘッダ DB登録
     * 
     * @param form
     */
    @Transactional
    public void add(EstimateForm form) {

        // 採番管理 見積No取得
        String estimateNo = mapper.getEstimateNo();

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

        return;
    }

    /**
     * 見積明細 DB登録
     * 
     * @param form
     */
    @Transactional
    public void addDetail(EstimateDetailForm form) {

        // 見積ID検索

        // DB登録
        EstimateDetail estimateDetail = new EstimateDetail(
                1L,
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
