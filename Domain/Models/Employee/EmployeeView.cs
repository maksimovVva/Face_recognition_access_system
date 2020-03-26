using System;
using System.Collections.Generic;

namespace Domain.Models.Employee
{
    public class EmployeeView
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public DateTime PassDate { get; set; }
        public DateTime LastStatusChangedDate { get; set; }
        public DateTime BirthdayDate { get; set; }
        public DictionaryItem Department { get; set; }
        public IEnumerable<DictionaryItem> SecurityLevel { get; set; }
        public bool IsTemporary { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public string PngPath { get; set; }
        public string AdditionalDocsPath { get; set; }
    }
}
