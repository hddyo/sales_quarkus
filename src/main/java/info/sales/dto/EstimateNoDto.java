package info.sales.dto;

public class EstimateNoDto {
    // 見積日
    String estimateDate;
    // シリアルNo
    Integer serialNo;
    // 結合No
    String compositeNo;

    public void setEstimateDate(String estimateDate) {
        this.estimateDate = estimateDate;
    }

    public void setSerialNo(Integer serialNo) {
        this.serialNo = serialNo;
    }

    public String getEstimateDate() {
        return estimateDate;
    }

    public Integer getSerialNo() {
        return serialNo;
    }

    public String getCompositeNo() {
        return compositeNo;
    }

    public void setCompositeNo(String compositeNo) {
        this.compositeNo = compositeNo;
    }

}
