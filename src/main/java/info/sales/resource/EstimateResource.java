package info.sales.resource;

import javax.inject.Inject;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.hibernate.exception.DataException;
import info.sales.form.EstimateDetailForm;
import info.sales.form.EstimateForm;
import info.sales.msg.AplicationMsg;
import info.sales.msg.EstimateDetailDataMsg;
import info.sales.msg.EstimateMsg;
import info.sales.service.EstimateService;
import info.sales.entity.EstimateDetail;

@Path("/api/estimate")
public class EstimateResource {

    private final EstimateService service;

    @Inject
    public EstimateResource(EstimateService service) {
        this.service = service;
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String estimate() {

        return "Hello Estimate";
    }

    /**
     * 明細データ取得
     */
    @GET
    @Path("detail")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDetailData(@QueryParam("estimateNo") String estimateNo, @QueryParam("rowNo") String rowNo) {

        try {

            EstimateDetail estimateDetail = service.getDetail(estimateNo, rowNo);

            EstimateDetailDataMsg msg = new EstimateDetailDataMsg(
                    estimateDetail.itemCode,
                    estimateDetail.itemName,
                    estimateDetail.salesQuantity,
                    estimateDetail.salesUnit,
                    estimateDetail.salesPrice,
                    estimateDetail.salesAmount,
                    estimateDetail.costPrice,
                    estimateDetail.costAmount,
                    estimateDetail.profit,
                    estimateDetail.taxedUnit,
                    estimateDetail.apply);
            return Response.ok(msg).build();

        } catch (EntityNotFoundException e) {

            EstimateDetailDataMsg msg = new EstimateDetailDataMsg(
                    "",
                    "",
                    null,
                    "",
                    null,
                    null,
                    null,
                    null,
                    null,
                    "",
                    "");
            return Response.ok(msg).build();

        }

    }

    /**
     * 見積ヘッダ登録
     * 
     * @param form 見積ヘッダフォーム
     * @return レスポンス
     */
    @POST
    @Path("header")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addHeader(EstimateForm form) {

        try {

            String estimanteNo = service.add(form);
            EstimateMsg msg = new EstimateMsg("001", "登録完了しました。", estimanteNo);
            return Response.ok(msg).build();

        } catch (DataException e) {

            AplicationMsg msg = new AplicationMsg("002", "異常発生しました。");
            return Response.status(404).entity(msg).build();

        }

    }

    /**
     * 見積明細登録
     * 
     * @param form 見積明細フォーム
     * @return レスポンス
     */
    @POST
    @Path("detail")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addDetail(EstimateDetailForm form) {

        try {

            String estimateNo = form.estimateNo();
            if (estimateNo == null || estimateNo.isEmpty()) {

                AplicationMsg msg = new AplicationMsg("001", "見積ヘッダを登録して下さい");
                // 422 Unprocessable Entity
                return Response.status(422).entity(msg).build();

            }

            service.addDetail(form);

            AplicationMsg msg = new AplicationMsg("001", "登録完了しました。");
            return Response.ok(msg).build();

        } catch (PersistenceException e) {

            AplicationMsg msg = new AplicationMsg("002", "異常発生しました。");
            return Response.status(404).entity(msg).build();

        }
    }

}