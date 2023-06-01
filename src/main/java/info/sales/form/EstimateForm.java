package info.sales.form;

import java.time.LocalDate;

/**
 * 見積ヘッダー フォームクラス
 */
public record EstimateForm(
        // 見積日時
        LocalDate estimateDate,
        // 顧客名
        String customerName,
        // 件名
        String subject,
        // 受渡期日
        String deliveryDeadline,
        // 受渡場所
        String deliveryLocation,
        // 見積有効期限
        String estimateExpirationDate,
        // 担当者
        String responsiblePerson,
        // 支払条件
        String paymentCriteria,
        // 適用
        String overview,
        // 見積番号
        String estimateNo) {
}
