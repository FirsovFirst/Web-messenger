import './chatPage.css'
import { Messanger } from './components/messanger/Messanger';
import { List } from './components/list/List';
import { useConnection } from '../../hook/useConnection';

const ChatPage = () => {
    const { currentChat } = useConnection();

    return (
        <div className='container'>
            <List/>
            {currentChat && <Messanger/>}
        </div>
    )
}

export {ChatPage}