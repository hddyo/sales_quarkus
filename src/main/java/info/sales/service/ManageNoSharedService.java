package info.sales.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.inject.Inject;
import javax.inject.Singleton;

import info.sales.dto.EstimateNoDto;
import info.sales.dto.LockEstimateNoDto;
import info.sales.mapper.ManageNoMapper;

@Singleton
public class ManageNoSharedService {

    @Inject
    ManageNoMapper mapper;

    // 見積No取得
    public String getEstimateNo() {

        // 採番テーブルをロック
        LockEstimateNoDto dto = mapper.lockEstimateNo();

        String estimateDate = dto.estimateDate();
        Integer no = dto.serialNo();
        String paddedNumber = "";

        EstimateNoDto dto2 = new EstimateNoDto();

        // 本日日付取得
        LocalDateTime local = LocalDateTime.now();
        String nowDate = local.format(DateTimeFormatter.BASIC_ISO_DATE);
        dto2.setEstimateDate(nowDate);

        if (estimateDate.equals(nowDate)) {
            dto2.setSerialNo(no + 1);

            paddedNumber = nowDate + String.format("%06d", no + 1);
            dto2.setCompositeNo(paddedNumber);

        } else {
            dto2.setSerialNo(1);

            // 日付
            paddedNumber = nowDate + String.format("%06d", 1);
            dto2.setCompositeNo(paddedNumber);

        }

        // 採番テーブルを更新
        mapper.updateEstimateNo(dto2);

        // 見積番号を返却
        return paddedNumber;
    }

}
