import * as React from "react";
import styles from "./ChatContainer.module.css";
import ChatDisplay from "../ChatDisplay";
import ChatHeader from "../ChatHeader/ChatHeader";
import MatchesDisplay from "../MatchesDisplay/MatchesDisplay";

const ChatContainer = ({ user }) => {
  const [clickedUser, setClickedUser] = React.useState(null);

  console.log('clickUser', clickedUser);
  return (
    <div className={styles.chatContainer}>
      <ChatHeader user={user} />

      <div>
        <button className={styles.option} onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className={styles.option} disabled={!clickedUser}>
          Chat
        </button>
      </div>

      {!clickedUser && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}
      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
    </div>
  );
};

export default ChatContainer;
