import styles from "./ChatHeader.module.css";

const ChatHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.profile}>
        <div className={styles.imgContainer}>
          <img src="" />
        </div>
        <h3>UserName</h3>
      </div>
      <i className={styles.logOutIcon}>&#8592;</i>
    </div>
  );
};

export default ChatHeader;
