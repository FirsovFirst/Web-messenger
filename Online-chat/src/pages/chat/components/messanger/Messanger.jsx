import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { useConnection } from '../../../../hook/useConnection';
import './messanger.css';
import { deleteChat, getMessages, sendMessage } from "../../../../hoc/Requests";
import { sendAllMessages } from '../../../../hoc/MessagesSender';

const Messanger = () => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState(false);
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const { connection, currentChat, currentBuddy, setCurrentChat, setCurrentBuddy } = useConnection();

    useEffect(() => {
        if (currentChat) {
            getMessages(currentChat).then(res => {
                if (res.status === 200) {
                    setMessages(res.data);
                }
            }).catch(() => {
                setCurrentChat(null);
                setCurrentBuddy(null);
            });
        }
    }, [currentChat, message, setCurrentChat, setCurrentBuddy])

    useEffect(() => {
        if (connection !== null) {
            connection.on('UpdateMessagesMessage', (message) => {
                if (message === localStorage.getItem('username')) {
                    setMessage(prev => !prev);
                }
            });
        }
    }, [connection])

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setEmojiOpen(false);
    }

    const handleSend = () => {
        if (text === '') return;

        sendMessage(currentChat, text).then(() => {
            sendAllMessages(connection, currentBuddy);
            setText('');
        }).catch(err => console.log(err));
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteChat(currentChat).then(() => {
            sendAllMessages(connection, currentBuddy);
        }).catch(err => console.log(err));
    }

    return (
        <div className='messanger'>
            <div className="top">
                <h2>{currentBuddy}</h2>
                <button className="button" onClick={handleDelete}>Удалить чат</button>
            </div>

            <div className="messages">
                {messages.map((message) => (
                    <div className={message.senderName === localStorage.getItem('username') ? "message own" : "message"} key={message.Id}>
                        <p>{message.text}</p>
                        <span>{Math.round((Date.now() - new Date(message.timeStamp).getTime()) / (1000 * 60) - 180)} минут назад</span>
                    </div>
                ))}
            </div>

            <div className="bottom">
                <input 
                    className='input'
                    type="text"
                    placeholder="Введите сообщение"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <div className='emoji' onClick={() => setEmojiOpen(prev => !prev)}>
                    😃
                    <div className="emojiPicker">
                        <EmojiPicker open={emojiOpen} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className='button' onClick={handleSend}>Отправить</button>
            </div>
        </div>
    );
}

export {Messanger}