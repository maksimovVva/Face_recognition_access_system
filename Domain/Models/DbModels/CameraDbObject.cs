namespace Domain.Models.DbModels
{
    public class CameraDbObject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public int SecurityLevelId { get; set; }
    }
}
