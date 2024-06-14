import axios from "axios";

const apiUrl = 'https://localhost:7253/Api';

const register = async (name, pw) => await axios({
    url: `${apiUrl}/Register`,
    method: 'POST',
    params: { username: name, password: pw },
});

const authorize = async (name, pw) => await axios({
    url: `${apiUrl}/Authorize`,
    method: 'GET',
    params: { username: name, password: pw },
});

const access = async () => await axios({
    url: `${apiUrl}/Access`,
    method: 'GET',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
});

const addChat = async (name) => await axios({
    url: `${apiUrl}/AddChat`,
    method: 'POST',
    params: { usernameOwn: localStorage.getItem('username'), username: name },
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
});

const getChats = async () => await axios({
    url: `${apiUrl}/GetChats`,
    method: 'GET',
    params: { usernameOwn: localStorage.getItem('username') },
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
});

const searchUser = async (name) => await axios({
    url: `${apiUrl}/SearchUser`,
    method: 'GET',
    params: { usernameOwn: localStorage.getItem('username'), username: name},
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
});

const getMessages = async (chatId) => await axios({
    url: `${apiUrl}/GetMessages`,
    method: 'GET',
    params: { id: chatId },
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
});

const sendMessage = async (chatid, message) => await axios({
    url: `${apiUrl}/SendMessage`,
    method: 'POST',
    params: { chatId: chatid, sender: localStorage.getItem('username'), text: message },
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
});

const deleteChat = async (chatid) => await axios({
    url: `${apiUrl}/DeleteChat`,
    method: 'DELETE',
    params: { id: chatid },
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
});

export {register, authorize, access, addChat, getChats, searchUser, getMessages, sendMessage, deleteChat}