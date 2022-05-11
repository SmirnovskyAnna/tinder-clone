import * as React from "react";
import { useCookies } from "react-cookie";
import AuthModal from "../../components/AuthModal/AuthModal";
import Nav from "../../components/Nav/Nav";
import styles from "./Home.module.css";

const Home = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;

  const handleClick = () => {
    if (authToken) {
      removeCookie("UserId", cookies.UserId);
      removeCookie("AuthToken", cookies.AuthToken);
      window.location.reload();
      return;
    }
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className={styles.overlay}>
      <Nav
        authToken={authToken}
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className={styles.home}>
        <h1 className="primaryTitle">Swipe Right</h1>
        <button className="primaryButton" onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>
        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  );
};

export default Home;
