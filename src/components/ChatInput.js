import * as React from 'react'
import styles from './ChatInput.module.css'

const ChatInput = () => {
  const [textarea, setTextArea] = React.useState(null)

  const handleChange = (e) => {
    setTextArea(e.target.value)
  }
  return <div className={styles.chatInput}>
    <textarea value={textarea} onChange={handleChange}/>
    <button className="secondaryButton">Submit</button>
  </div>;
};

export default ChatInput;
