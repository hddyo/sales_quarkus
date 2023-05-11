package info.sales.form;

public record EstimateDetailForm(
        // 行番号
        String rowNo,
        // 商品コード
        String itemCode,
        // 商品名
        String itemName,
        // 販売数量
        Integer salesQuantity,
        // 販売単位
        String salesUnit,
        // 販売単価
        Integer salesPrice,
        // 販売金額
        Integer salesAmount,
        // 販売原価
        Integer costPrice,
        // 原価金額
        Integer costAmount,
        // 粗利
        Integer profit,
        // 課税区分
        String taxedUnit,
        // 適用
        String apply) {
}