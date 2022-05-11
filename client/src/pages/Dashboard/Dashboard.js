import axios from "axios";
import * as React from "react";
import { useCookies } from "react-cookie";
import TinderCard from "react-tinder-card";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [lastDirection, setLastDirection] = React.useState();
  const [user, setUser] = React.useState(null);
  const [genderedUsers, setGenderedUsers] = React.useState(null);
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

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/gendered-users", {
        params: { gender: user?.gender_interest },
      });
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
    getGenderedUsers();
  }, [user, genderedUsers]);

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:8000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
  );

  return (
    <>
      {user && (
        <div className={styles.dashboard}>
          <ChatContainer user={user} />
          <div className={styles.swiperContainer}>
            <div className={styles.cardContainer}>
              {filteredGenderedUsers?.map((genderedUser) => (
                <TinderCard
                  className={styles.swipe}
                  key={genderedUser.first_name}
                  onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                >
                  <div
                    style={{ backgroundImage: `url(${genderedUser.url})` }}
                    className={styles.card}
                  >
                    <h3>{genderedUser.first_name}</h3>
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
