package info.sales.resource;

import javax.inject.Inject;
import javax.persistence.PersistenceException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.hibernate.exception.DataException;

import info.sales.form.EstimateDetailForm;
import info.sales.form.EstimateForm;
import info.sales.msg.AplicationMsg;
import info.sales.service.EstimateService;

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
            service.add(form);

            AplicationMsg msg = new AplicationMsg("001", "登録完了しました。");
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
            service.addDetail(form);

            AplicationMsg msg = new AplicationMsg("001", "登録完了しました。");
            return Response.ok(msg).build();

        } catch (PersistenceException e) {

            AplicationMsg msg = new AplicationMsg("002", "異常発生しました。");
            return Response.status(404).entity(msg).build();

        }
    }

}