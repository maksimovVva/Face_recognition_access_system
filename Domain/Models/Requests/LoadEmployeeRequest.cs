namespace Domain.Models.Requests
{
    public class LoadEmployeeRequest
    {
        public LoadEmployeeRequest()
        {
            Take = 10;
        }
        public int Skip { get; set; }

        public int Take { get; set; }
    }
}
