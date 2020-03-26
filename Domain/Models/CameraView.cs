namespace Domain.Models
{
    public class CameraView
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public int SecurityLevelId { get; set; }
        public int StatusId { get; set; }
    }
}
