package info.sales.resource;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import info.sales.service.HogeService;

@Path("/hoge")
public class HogeResource {

    private final HogeService service;

    @Inject
    public HogeResource(HogeService service) {
        this.service = service;
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/get")
    public String hello() {
        service.get();
        return "Hello Hoge";
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/add")
    public String add() {
        service.add();
        return "hoge";
    }

}