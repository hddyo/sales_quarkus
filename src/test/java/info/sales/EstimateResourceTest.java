package info.sales;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class EstimateResourceTest {

    @Test
    public void testHelloEndpoint() {
        given()
                .when().get("/estimate")
                .then()
                .statusCode(200)
                .body(is("Hello Estimate"));
    }

}