public class FlowControllerLwc 
{
    public static Flow.Interview.Flow_LWC myFlow;
	@AuraEnabled
    public static void start(String jsonData)
    {
        WrapperInfo data = (WrapperInfo)JSON.deserialize(jsonData, WrapperInfo.class);
        Map<String,Object> mapValue = new Map<String,Object>();
        List<Object> inList = new List<Object>();
        
        mapValue.put('firstName_Flow',data.firstName);
        mapValue.put('lastName_Flow',data.lastName);
        mapValue.put('email_Flow',data.email);
           
        myFlow = new Flow.Interview.Flow_LWC(mapValue);
        myFlow.start();
    }
    public class WrapperInfo
    {
        public String firstName;
        public String lastName;
        public String email;
    }    
}