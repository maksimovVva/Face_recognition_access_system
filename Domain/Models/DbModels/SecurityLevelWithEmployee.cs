namespace Domain.Models.DbModels
{
    public class SecurityLevelWithEmployee
    {
        public int EmployeeId { get; set; }
        public int SecurityLevelId { get; set; }
        public string SecurityLevelName { get; set; }
    }
}
