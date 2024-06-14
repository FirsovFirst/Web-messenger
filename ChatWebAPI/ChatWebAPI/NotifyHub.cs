using Microsoft.AspNetCore.SignalR;

namespace ChatWebAPI
{
    public class NotifyHub : Hub
    {
        public Task UpdateChatsMessage(string username)
        {
            return Clients.All.SendAsync("UpdateChatsMessage", username);
        }

        public Task UpdateMessagesMessage(string username)
        {
            return Clients.All.SendAsync("UpdateMessagesMessage", username);
        }
    }
}
