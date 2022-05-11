import * as React from "react";
import axios from "axios";
import Chat from "../Chat/Chat";
import ChatInput from "../ChatInput/ChatInput";
import styles from "./ChatDisplay.module.css";

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = React.useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = React.useState(null);

  const getUsersMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: userId, correspondingUserId: clickedUserId },
      });
      setUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClickedUsersMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: clickedUserId, correspondingUserId: userId },
      });
      setClickedUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
  }, []);

  const messages = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.first_name;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = clickedUser?.first_name;
    formattedMessage["img"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  return (
    <>
      <Chat descendingOrderMessages={descendingOrderMessages} />
      <ChatInput />
    </>
  );
};

export default ChatDisplay;
