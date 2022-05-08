import styles from "./ChatHeader.module.css";
import { useCookies } from "react-cookie";

const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    window.location.reload();
  };

  return (
    <div className={styles.header}>
      <div className={styles.profile}>
        <div className={styles.imgContainer}>
          <img
            src={user.url}
            alt={`${user.first_name} ${user.last_name}'s photo`}
          />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <i className={styles.logOutIcon} onClick={logout}>
        &#8592;
      </i>
    </div>
  );
};

export default ChatHeader;
