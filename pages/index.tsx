import Link from "next/link"
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [roomName, setRoomName] = useState("")

  function handleChange(e) {
    setRoomName(e.target.value)
  }

  return (
    <div className={styles.container}>
      <input placeholder="Room Name" className={styles.input} value={roomName} onChange={handleChange} type="text" id="roomName" name="roomName" />
      <Link href={`/${roomName}`}><a className={styles.button}>Click me</a></Link>
    </div>
  )
}
