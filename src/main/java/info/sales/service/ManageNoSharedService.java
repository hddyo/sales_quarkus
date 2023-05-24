package info.sales.service;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import info.sales.mapper.ManageNoMapper;

@ApplicationScoped
public class ManageNoSharedService {

    @Inject
    ManageNoMapper mapper;

    // 見積No取得
    public String getEstimateNo() {

        // 採番テーブルをロック
        String str = mapper.getEstimateNo();

        // 採番テーブルを更新
        System.out.println("aaaaa");

        return "";
    }

}
