package info.sales.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "estimate_detail")
public class EstimateDetail extends PanacheEntityBase {

    @Id
    @SequenceGenerator(name = "estimate_detail_id_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "estimate_id", nullable = true)
    public Long estimateId;

    @Column(name = "row_no")
    public String rowNo;

    @Column(name = "item_code")
    public String itemCode;

    @Column(name = "item_name", nullable = true)
    public String itemName;

    @Column(name = "sales_quantity", nullable = true)
    public Integer salesQuantity;

    @Column(name = "sales_unit", nullable = true)
    public String salesUnit;

    @Column(name = "sales_price", nullable = true)
    public Integer salesPrice;

    @Column(name = "sales_amount", nullable = true)
    public Integer salesAmount;

    @Column(name = "cost_price", nullable = true)
    public Integer costPrice;

    @Column(name = "cost_amount", nullable = true)
    public Integer costAmount;

    @Column(name = "profit", nullable = true)
    public Integer profit;

    @Column(name = "taxed_unit", nullable = true)
    public String taxedUnit;

    @Column(name = "apply", nullable = true)
    public String apply;

    public EstimateDetail() {
    }

    public EstimateDetail(Long estimateId, String rowNo, String itemCode, String itemName,
            Integer salesQuantity, String salesUnit, Integer salesPrice, Integer salesAmount, Integer costPrice,
            Integer costAmount, Integer profit, String taxedUnit, String apply) {
        this.estimateId = estimateId;
        this.rowNo = rowNo;
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.salesQuantity = salesQuantity;
        this.salesUnit = salesUnit;
        this.salesPrice = salesPrice;
        this.salesAmount = salesAmount;
        this.costPrice = costPrice;
        this.costAmount = costAmount;
        this.profit = profit;
        this.taxedUnit = taxedUnit;
        this.apply = apply;
    }

}