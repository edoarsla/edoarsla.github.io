import com.confighub.client.*;


public class PullTest
{
    public static void main(String... args)
    {
        ConfigHub configHub = new ConfigHub("ConfigHub", "Demo")
            .setContext("Production;PullTest")
            .setApplicationName("PullTest");
            .setConfighubServerAddress("demo.confighub.com");

        confighub.pull();

        // Get a few properties returned from the pull request
        int dbPort = configHub.properties.getInteger("db.port");
        String dbHost = configHub.properties.get("db.host");

        // Get structured data
        Map<String, String> map =
                configHub.properties.getMap("client.labels");

        // Get some config files
        String log4jxml = confighub.files.get("/logger/log4j2.xml");
        String tomeeXml = confighub.files.get("/server/tomee.xml");
    }
}

