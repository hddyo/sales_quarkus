package info.sales.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface ManageNoMapper {
    @Select("select estimate_no from estimate_number")
    String getEstimateNo();
}