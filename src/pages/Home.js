import Nav from "../components/Nav";
import styles from "./Home.module.css";

const Home = () => {
  const authToken = false;

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className={styles.overlay}>
      <Nav minimal={false} authToken={authToken} />
      <div className={styles.home}>
        <h1>Swipe Right</h1>
        <button className="primaryButton" onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default Home;
