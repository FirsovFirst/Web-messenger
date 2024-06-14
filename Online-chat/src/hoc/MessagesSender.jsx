const sendChatsMessages = (connection, username) => {
    connection.invoke('UpdateChatsMessage', username);
    connection.invoke('UpdateChatsMessage', localStorage.getItem('username'));
};

const sendAllMessages = (connection, username) => {
    connection.invoke('UpdateChatsMessage', username);
    connection.invoke('UpdateMessagesMessage', username);
    connection.invoke('UpdateChatsMessage', localStorage.getItem('username'));
    connection.invoke('UpdateMessagesMessage', localStorage.getItem('username'));
};

export {sendChatsMessages, sendAllMessages}