using System;

namespace Domain.Models.DbModels
{
    public class EmployeeDbObject
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public DateTime BirthdayDate { get; set; }
        public DateTime LastChangedStatusDate { get; set; }
        public DateTime PassDate { get; set; }
        public bool IsTemporary { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string PngPath { get; set; }
        public string AdditionalDocsPath { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
    }
}
