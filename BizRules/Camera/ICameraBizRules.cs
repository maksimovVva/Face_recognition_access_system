using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;

namespace BizRules.Camera
{
    public interface ICameraBizRules
    {
        Task<IEnumerable<CameraView>> GetAll();
        CameraView Get(int id);
        Task<IEnumerable<CameraView>> Get(IEnumerable<int> ids);
    }
}
