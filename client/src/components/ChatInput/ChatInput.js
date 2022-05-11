import axios from "axios";
import * as React from "react";
import styles from "./ChatInput.module.css";

const ChatInput = ({
  user,
  clickedUser,
  getUserMessages,
  getClickedUsersMessages,
}) => {
  const [textArea, setTextArea] = React.useState("");
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };

    try {
      await axios.post("http://localhost:8000/message", { message });
      getUserMessages();
      getClickedUsersMessages();
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.chatInput}>
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button className="secondaryButton" onClick={addMessage}>
        Submit
      </button>
    </div>
  );
};

export default ChatInput;
