using System.ComponentModel.DataAnnotations;

namespace N.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}