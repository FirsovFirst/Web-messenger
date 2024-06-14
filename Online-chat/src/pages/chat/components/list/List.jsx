import { useNavigate } from "react-router-dom";
import './list.css';
import { AddUser } from "./AddUser";
import { useState, useEffect } from "react";
import { useConnection } from '../../../../hook/useConnection';
import { getChats } from "../../../../hoc/Requests";

const List = () => {
    const navigate = useNavigate();
    const { connection, setCurrentChat, setCurrentBuddy } = useConnection();

    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState('');
    const [message, setMessage] = useState(false);

    const logOut = () => {
        localStorage.setItem('jwt', null);
        localStorage.setItem('username', null);
        setCurrentChat(null);
        setCurrentBuddy(null);
        navigate('/login', {replace: true});
    }

    useEffect(() => {
        getChats().then(res => {
            setChats(res.data);
        }).catch(err => console.log(err));
    }, [message])

    useEffect(() => {
        if (connection !== null) {
            connection.on('UpdateChatsMessage', (message) => {
                if (message === localStorage.getItem('username')) {
                    setMessage(prev => !prev);
                }
            });
        }
    }, [connection])

    const handleSelect = (id, name) => {
        setCurrentChat(id);
        setCurrentBuddy(name);
    }

    const filteredChats = chats.filter((chat) => {
        return chat.username.toLowerCase().includes(input.toLowerCase());
    });
    
    return (
        <div className='list'>
            <div className='userInfo'>
                <h2>{localStorage.getItem('username')}</h2>
                <button className='button' onClick={logOut}>Выйти</button>
            </div>

            <div className='search'>
                <input className='searchBar' type='text' placeholder='Поиск' onChange={(e) => setInput(e.target.value)}/>
                <button className='button' onClick={() => setAddMode((prev) => !prev)}>{addMode ? '-' : '+'}</button>
            </div>

            {addMode && <AddUser/>}

            <div className='chatList'>
                {filteredChats.map((chat) => (
                    <div className='chat' key={chat.id} onClick={() => handleSelect(chat.id, chat.username)}>
                        <h3>{chat.username}</h3>
                        <p>{chat.lastMessage}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export {List}