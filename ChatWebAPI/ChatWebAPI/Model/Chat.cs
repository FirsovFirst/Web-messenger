using System.ComponentModel.DataAnnotations;

namespace ChatWebAPI.Model
{
    public class Chat
    {
        public int Id { get; set; }

        [Required]
        public ICollection<User> Users { get; set; }

        public string? LastMessage { get; set; }

        public ICollection<Message> Messages { get; set; }
    }

    public class Message
    {
        public int Id { get; set; }

        public string SenderName { get; set; }

        public string? Text { get; set; }

        public DateTime TimeStamp { get; set; }

        [Required]
        public Chat Chat { get; set; }
    }
}
