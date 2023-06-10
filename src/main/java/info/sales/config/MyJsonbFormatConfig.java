package info.sales.config;

import javax.inject.Singleton;
import javax.json.bind.JsonbConfig;

import io.quarkus.jsonb.JsonbConfigCustomizer;

@Singleton
public class MyJsonbFormatConfig implements JsonbConfigCustomizer {

    public void customize(JsonbConfig config) {
        config.withNullValues(true);
    }
}