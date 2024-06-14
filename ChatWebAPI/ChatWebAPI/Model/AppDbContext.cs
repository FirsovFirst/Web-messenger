using Microsoft.EntityFrameworkCore;

namespace ChatWebAPI.Model
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Chat> Chats { get; set; }

        public DbSet<Message> Messages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=UWU;Initial Catalog=Firsov;Integrated Security=True;Trust Server Certificate=True");
        }
    }
}
