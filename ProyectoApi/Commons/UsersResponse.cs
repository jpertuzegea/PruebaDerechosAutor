using Commons.Dtos;

namespace Commons
{
    public class UsersResponse
    {
        public List<UserDto> Users { get; set; } = new();
        public int Total { get; set; }
        public int Skip { get; set; }
        public int Limit { get; set; }
    }
}
