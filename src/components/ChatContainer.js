import styles from "./ChatContainer.module.css";
import ChatDisplay from "./ChatDisplay";
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";

const ChatContainer = () => {
  return (
    <div className={styles.chatContainer}>
      <ChatHeader/>

      <div>
        <button className={styles.option}>Matches</button>
        <button className={styles.option}>Chat</button>
      </div>

      <MatchesDisplay/>
      <ChatDisplay/>
    </div>
  )
};

export default ChatContainer;
