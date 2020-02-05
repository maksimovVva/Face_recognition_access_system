using System;

namespace Domain.Models.Employee
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Department Department { get; set; }
        public StatusIds Status { get; set; }
        public DateTime ChangedStatusDate { get; set; }
        public string PngPath { get; set; }
    }
}
