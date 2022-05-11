import axios from "axios";
import * as React from "react";
import styles from "./ChatInput.module.css";

const ChatInput = ({
  user,
  clickedUser,
  getUsersMessages,
  getClickedUsersMessages,
}) => {
  const [textarea, setTextArea] = React.useState(null);
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textarea,
    };

    try {
      await axios.post("http://localhost:8000/message", { message });
      getUsersMessages();
      getClickedUsersMessages();
      setTextArea("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.chatInput}>
      <textarea
        value={textarea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button className="secondaryButton" onClick={addMessage}>
        Submit
      </button>
    </div>
  );
};

export default ChatInput;
