using Domain.Models.Employee;

namespace Domain.Models
{
    public class PushModel
    {
        public EmployeeView Employee { get; set; }
        public DictionaryItem Type { get; set; }
        public string CameraUrl { get; set; }
    }
}
