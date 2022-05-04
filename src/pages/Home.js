import Nav from "../components/Nav";
import styles from "./Home.module.css";

const Home = () => {
  const authToken = true;

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <>
      <Nav />
      <div className={styles.home}>
        <h1>Swipe Right</h1>
        <button className={styles.primaryButton} onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>
      </div>
    </>
  );
};

export default Home;
