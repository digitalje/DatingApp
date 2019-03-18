using Microsoft.AspNetCore.Http;

namespace DatingApp.API.helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message) {
            // Header we want to add
            response.Headers.Add("Application-Error", message);
            // We need to now add the header to the list of headers we want to expose (make CORS compliant)
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            // Allow any origin
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    }
}