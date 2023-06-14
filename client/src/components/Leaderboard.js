import { React, useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  where,
} from "firebase/firestore";
import { db } from "../service/firebase";
import "./Leaderboard.scss";

const Leaderboard = (props) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // const { globalUsername } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "leaderboard"),
      where("level", "==", props.level),
      orderBy("score", "desc"),
      limit(10)
    );
    onSnapshot(q, (querySnapshot) => {
      setLeaderboardData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    leaderboardData[0]?.length !== 0 && setDataLoaded(true);
  }, [props.level]);

  return (
    <div>
      <table className="leaderboard">
        <tbody>
          <tr className="leaderboard__row">
            <th className="leaderboard__header">No.</th>
            <th className="leaderboard__header">Użytkownik</th>
            <th className="leaderboard__header">Punkty</th>
          </tr>
          {dataLoaded &&
            Object.keys(leaderboardData).map((key) => (
              <tr key={3 * key + 1} className="leaderboard__row">
                <td key={key} className="leaderboard__data">
                  {parseInt(key) + 1}
                </td>
                <td key={key + 1} className="leaderboard__data">
                  {leaderboardData[key].data.name}
                </td>
                <td key={key + 2} className="leaderboard__data">
                  {leaderboardData[key].data.score}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
