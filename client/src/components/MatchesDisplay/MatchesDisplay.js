import * as React from "react";
import axios from "axios";
import styles from "./MatchesDisplay.module.css";

const MatchesDisplay = ({ matches }) => {
  const [matchedProfiles, setMatchedProfiles] = React.useState(null);

  const matchedUserIds = matches.map(({ user_id }) => user_id);

  const getMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getMatches();
  }, [matches]);

  console.log(matchedProfiles);

  return (
    <div className={styles.matchesDisplay}>
      {matchedProfiles?.map((match, _index) => (
        <div key={_index} className={styles.matchCard}>
          <div className={styles.imgContainer}>
            <img src={match?.url} alt={match?.first_name + " profile"} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
