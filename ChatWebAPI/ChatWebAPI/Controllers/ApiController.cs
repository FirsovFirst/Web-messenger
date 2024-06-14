using ChatWebAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ApiController : ControllerBase
    {
        AppDbContext db = new();
        JwtGiver jwtGiver = new JwtGiver();

        [HttpGet]
        public IActionResult Authorize(string username, string password)
        {
            if (username == null || password == null) return BadRequest();

            ICollection<User> users = db.Users.ToArray();

            var user = users.FirstOrDefault(u => u.Username == username && u.Password == password);

            if (user == null) return Unauthorized();

            return Ok(jwtGiver.GetJwt(username));
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Access", Roles = "client")]
        public IActionResult Access()
        {
            return Ok("Client");
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Access", Roles = "client")]
        public IActionResult GetChats(string usernameOwn)
        {
            var userOwn = db.Users.FirstOrDefault(user => user.Username == usernameOwn);
            var chats = db.Chats.Where(chat => chat.Users.Contains(userOwn)).ToArray();

            List<ChatInfo> chatsInfo = new List<ChatInfo>();

            foreach (var chat in chats) {
                var username = db.Users.FirstOrDefault(user => user.Chats.Contains(chat) && user.Username != usernameOwn).Username;

                chatsInfo.Add(new ChatInfo { Id = chat.Id, Username = username, LastMessage = chat.LastMessage });
            }

            return Ok(chatsInfo);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Access", Roles = "client")]
        public IActionResult SearchUser(string usernameOwn, string username)
        {
            var user = db.Users.FirstOrDefault(u => u.Username == username && u.Username != usernameOwn);

            if (user == null) return BadRequest();

            return Ok(user.Username);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Access", Roles = "client")]
        public IActionResult GetMessages(int id)
        {
            if (db.Chats.FirstOrDefault(chat => chat.Id == id) == null) return BadRequest();

            var messages = db.Messages.Where(message => message.Chat.Id == id).ToArray();

            if (messages == null) return NoContent();

            return Ok(messages);
        }

        [HttpPost]
        public IActionResult Register(string username, string password)
        {
            if (username == null || password == null) return BadRequest();

            var user = db.Users.FirstOrDefault(u => u.Username == username);

            if (user != null) return Conflict();

            User newUser = new()
            {
                Username = username,
                Password = password
            };

            db.Users.Add(newUser);
            db.SaveChanges();

            return Ok(jwtGiver.GetJwt(username));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "Access", Roles = "client")]
        public IActionResult AddChat(string usernameOwn, string username)
        {
            var user1 = db.Users.FirstOrDefault(user => user.Username == usernameOwn);
            var user2 = db.Users.FirstOrDefault(user => user.Username == username);

            var chat = db.Chats.FirstOrDefault(chat => chat.Users.Contains(user1) && chat.Users.Contains(user2));

            if (chat != null) return BadRequest();

            Chat newChat = new()
            {
                Users = new List<User> { user1, user2 },
                LastMessage = ""
            };

            db.Chats.Add(newChat);
            db.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "Access", Roles = "client")]
        public IActionResult SendMessage(int chatId, string sender, string text)
        {
            var chat = db.Chats.FirstOrDefault(chat => chat.Id == chatId);

            if (chat == null) return BadRequest();

            Message message = new()
            {
                SenderName = sender,
                Text = text,
                TimeStamp = DateTime.UtcNow,
                Chat = chat
            };

            chat.LastMessage = text;
            db.Messages.Add(message);
            db.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = "Access", Roles = "client")]
        public IActionResult DeleteChat(int id)
        {
            var chat = db.Chats.FirstOrDefault(chat => chat.Id == id);
            db.Chats.Remove(chat);
            db.SaveChanges();
            return Ok("Success");
        }
    }
}