import com.confighub.client.*;


public class PushTest
{
    public static void main(String... args)
    {
        ConfigHub configHub = new ConfigHub("ConfigHub", "Demo")
            .setApplicationName("PushTest")
            .setConfighubServerAddress("demo.confighub.com");

        // Update a single value
        configHub.pushQueue.key("count.total")
                           .setValue(32, "Production;PushTest");

        // Update multiple values for a single key
        configHub.pushQueue.key("logger.level")
                           .setValue("DEBUG", "*;PushTest")
                           .setValue("INFO", "Production;PushTest");

        PushResponse response = configHub.pushQueue.flush();
    }
}

