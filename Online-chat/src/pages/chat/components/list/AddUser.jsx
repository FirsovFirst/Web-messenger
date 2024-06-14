import './addUser.css';
import { addChat, searchUser } from '../../../../hoc/Requests';
import { useState } from 'react';
import { useConnection } from  '../../../../hook/useConnection';
import { sendChatsMessages } from '../../../../hoc/MessagesSender';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const { connection } = useConnection();

    const handleSearch = (event) => {
        event.preventDefault();
        if (username !== '') {
            searchUser(username).then(res => setUser(res.data)).catch(err => {
                setUser(null);
            });
        }
    }

    const handleAdd = (event) => {
        event.preventDefault();
        try {
            addChat(user).then(() => {
                sendChatsMessages(connection, user);
            }).catch(err => console.log(err));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type='text' placeholder='Введите имя' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <button className='button'>Поиск</button>
            </form>
            { user && <div className='user'>
                <p>{user}</p>
                <button className='button' onClick={handleAdd}>Добавить</button>
            </div> }
        </div>
    );
}

export {AddUser}