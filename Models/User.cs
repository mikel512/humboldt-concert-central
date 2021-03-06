using System.ComponentModel.DataAnnotations;

namespace fortress.core.Model
{
    public class UserWithRole
    {
        [Key]
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string NormalizedName { get; set; }
    }
}
