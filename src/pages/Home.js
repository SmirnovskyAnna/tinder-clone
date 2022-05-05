import * as React from "react";
import AuthModal from "../components/AuthModal";
import Nav from "../components/Nav";
import styles from "./Home.module.css";

const Home = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(true);

  const authToken = false;

  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className={styles.overlay}>
      <Nav
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
        {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>}
      </div>
    </div>
  );
};

export default Home;
