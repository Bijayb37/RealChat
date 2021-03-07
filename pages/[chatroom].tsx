import { useState } from 'react'
import Link from "next/link"
import styles from '../styles/chatroom.module.css'
import useChat from '../hooks/useChat'
import { useRouter } from 'next/router'

export default function ChatRoom(props) {
    const router = useRouter()
    const { chatroom: roomId } = router.query
    const { messages, sendMessage } = useChat(roomId)
    const [newMessage, setNewMessage] = useState("")
    
    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
    };

    const mapped = messages.map((m, i) => (
        <li 
        key={i} 
        className={`${styles.messageItem} ${m.ownedByCurrentUser ? styles.myMessage : styles.othersMessage}`}>{m.body}
        </li>
    ))
    return (
        <div className={styles.chatContainer}>
            <div className={styles.titleContainer}>
                <p className={styles.roomTitle}>ChatRoom: {roomId}</p>
                <Link href="/"><a className={styles.goBack}>Change Rooms</a></Link>
            </div>
            <div className={styles.messageBox}>
                <ul className={styles.messageList}>
                    {mapped}
                </ul>
            </div>
            <textarea value={newMessage} onChange={handleChange} className={styles.newMessage} />
            <button onClick={handleSendMessage} className={styles.postButton}>Send</button>            
        </div>
    )
}
