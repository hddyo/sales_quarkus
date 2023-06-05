package info.sales.msg;

public record EstimateDetailDataMsg(
        String itemCode, // 商品コード
        String itemName, // 商品名
        Integer salesQuantity, // 販売数量
        String salesUnit, // 販売単位
        Integer salesPrice, // 販売単価
        Integer salesAmount, // 販売金額
        Integer costPrice, // 販売原価
        Integer costAmount, // 原価金額
        Integer profit, // 粗利
        String taxedUnit, // 課税区分
        String apply// 適用
) {
}