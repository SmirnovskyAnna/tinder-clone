import axios from "axios";
import * as React from "react";
import { useCookies } from "react-cookie";
import TinderCard from "react-tinder-card";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import styles from "./Dashboard.module.css";

const characters = [
  {
    name: "Richard Hendricks",
    url: "https://i.imgur.com/oPj4A8u.jpeg",
  },
  {
    name: "Erlich Bachman",
    url: "https://i.imgur.com/Q9WPlWA.jpeg",
  },
  {
    name: "Monica Hall",
    url: "https://i.imgur.com/MWAcQRM.jpeg",
  },
  {
    name: "Jared Dunn",
    url: "https://i.imgur.com/wDmRJPc.jpeg",
  },
  {
    name: "Dinesh Chugtai",
    url: "https://i.imgur.com/OckVkRo.jpeg",
  },
];

const Dashboard = () => {
  const [lastDirection, setLastDirection] = React.useState();
  const [user, setUser] = React.useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  console.log("user", user);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };
  return (
    <>
      {user && (
        <div className={styles.dashboard}>
          <ChatContainer user={user} />
          <div className={styles.swiperContainer}>
            <div className={styles.cardContainer}>
              {characters.map((character) => (
                <TinderCard
                  className={styles.swipe}
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name)}
                  onCardLeftScreen={() => outOfFrame(character.name)}
                >
                  <div
                    style={{ backgroundImage: `url(${character.url})` }}
                    className={styles.card}
                  >
                    <h3>{character.name}</h3>
                  </div>
                </TinderCard>
              ))}
              <div className={styles.swipeInfo}>
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
