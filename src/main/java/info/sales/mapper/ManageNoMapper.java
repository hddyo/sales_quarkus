package info.sales.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import info.sales.dto.EstimateNoDto;
import info.sales.dto.LockEstimateNoDto;

@Mapper
public interface ManageNoMapper {
    @Select("""
            <script>
            select estimate_date as estimateDate,serial_no as serialNo from estimate_number where id = 1 FOR UPDATE
            </script>
            """)
    public LockEstimateNoDto lockEstimateNo();

    @Update("""
            <script>
              UPDATE estimate_number
              SET
                <if test="estimateDate != null">
                estimate_date = #{estimateDate},
                </if>
                <if test="serialNo != null">
                serial_no = #{serialNo},
                </if>
                <if test="compositeNo != null">
                composite_no = #{compositeNo}
                </if>
              WHERE id = 1
              </script>
            """)
    public boolean updateEstimateNo(EstimateNoDto dto);
}