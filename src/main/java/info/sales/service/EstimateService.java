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
     * 見積ヘッダ登録/更新
     * 
     * @param form
     */
    @Transactional
    public String add(EstimateForm form) {

        String estimateNo = "";

        if (form.estimateNo() == null || form.estimateNo().isEmpty()) {
            // 登録

            // 採番（見積番号）
            estimateNo = manageNoSharedService.getEstimateNo();

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

        } else {
            // 更新

            // 見積番号からIDの検索
            Estimate estimate = new Estimate();
            Optional<Estimate> optional = Estimate.findByEstimateNo(form.estimateNo());
            estimate = optional.orElseThrow(EntityNotFoundException::new);

            // 未入力だったら設定しないが必要
            estimate.estimateDate = form.estimateDate();
            estimate.customerName = form.customerName();
            estimate.subject = form.subject();
            estimate.deliveryDeadline = form.deliveryDeadline();
            estimate.deliveryLocation = form.deliveryLocation();
            estimate.estimateExpirationDate = form.estimateExpirationDate();
            estimate.responsiblePerson = form.responsiblePerson();
            estimate.paymentCriteria = form.paymentCriteria();
            estimate.overview = form.overview();
            estimate.persist();

            estimateNo = form.estimateNo();

        }

        return estimateNo;
    }

    /**
     * 見積明細 DB登録/更新
     * 
     * @param form
     */
    @Transactional
    public void addDetail(EstimateDetailForm form) {

        Estimate estimate = new Estimate();

        // 見積ID検索
        // 見積番号を元にＩＤ検索
        Optional<Estimate> optionalEstimate = Estimate.findByEstimateNo(form.estimateNo());
        estimate = optionalEstimate.orElseThrow(EntityNotFoundException::new);
        Long id = estimate.id;

        // 明細検索
        // 見積IDと行番号を元に明細検索
        Optional<EstimateDetail> optionalDetail = EstimateDetail.findByEstimateIdAndRowNo(id, form.rowNo());
        if (optionalDetail.isPresent()) {
            // データ有り
            // DB更新
            EstimateDetail estimateDetail = optionalDetail.get();
            estimateDetail.itemCode = form.itemCode();
            estimateDetail.itemName = form.itemName();
            estimateDetail.salesQuantity = form.salesQuantity();
            estimateDetail.salesUnit = form.salesUnit();
            estimateDetail.salesPrice = form.salesPrice();
            estimateDetail.salesAmount = form.salesAmount();
            estimateDetail.costPrice = form.costPrice();
            estimateDetail.costAmount = form.costAmount();
            estimateDetail.profit = form.profit();
            estimateDetail.taxedUnit = form.taxedUnit();
            estimateDetail.apply = form.apply();
            estimateDetail.persist();
        } else {
            // データ無し
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

        }

        return;
    }

    /**
     * 見積明細データ取得
     * 
     * @param form 見積明細フォーム
     * @return
     */
    public EstimateDetail getDetail(String estimateNo, String rowNo) {

        Estimate estimate = new Estimate();

        // 見積番号を元にＩＤ検索
        Optional<Estimate> optionalEstimate = Estimate.findByEstimateNo(estimateNo);
        estimate = optionalEstimate.orElseThrow(EntityNotFoundException::new);
        Long id = estimate.id;

        // 見積IDを元に明細検索
        EstimateDetail estimateDetail = new EstimateDetail();

        Optional<EstimateDetail> optionalDetail = EstimateDetail.findByEstimateIdAndRowNo(id, rowNo);
        estimateDetail = optionalDetail.orElseThrow(EntityNotFoundException::new);

        return estimateDetail;
    }

}
