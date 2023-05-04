package info.sales.resource;

import java.util.Objects;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.logging.Logger;

import info.sales.entity.LoginUser;
import info.sales.form.LoginForm;
import info.sales.msg.RecordErrorMsg;
import info.sales.service.LoginUserService;

@Path("/api/login")
public class LoginUserResource {

    @Inject
    Logger JBOSS_LOGGER;

    private final LoginUserService service;

    @Inject
    public LoginUserResource(LoginUserService service) {
        this.service = service;
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("{id}")
    public String get(@PathParam("id") Long id) {
        LoginUser user = service.findById(id);
        return user.fullName;
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/add")
    public String add() {
        service.add();
        return "Hello from RESTEasy Reactive";
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(LoginForm loginForm) {

        // ログ出力
        JBOSS_LOGGER.info("geeeeeeeeeeeeeeee");

        // JSON パラメータ取得
        String id = loginForm.id;
        String password = loginForm.password;

        // ログインユーザデータ取得
        LoginUser user = service.findByloginCdAndPass(id, password);

        // 存在無し
        if (Objects.isNull(user)) {
            RecordErrorMsg emsg = new RecordErrorMsg("001", "ログインユーザが見つかりません");
            return Response.status(404).entity(emsg).build();

        }

        // OKパターン
        return Response.ok(user).build();

    }

}