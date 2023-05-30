import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
  limit,
} from "firebase/firestore";
import { db } from "../service/firebase";

const addScore = async (displayName, score, level) => {
  try {
    // Tworzenie zapytania do Firestore, które zwraca wyniki quizów o podanym imieniu
    console.log(displayName);
    const q = query(
      collection(db, "leaderboard"),
      where("name", "==", displayName),
      where("level", "==", level),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    console.log(score);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const currentScore = doc.data().score;

      console.log(currentScore);

      // Porównanie nowego wyniku z obecnym wynikiem
      if (score > currentScore) {
        // Aktualizacja wyniku tylko jeśli nowy wynik jest lepszy
        const newData = {
          name: displayName,
          score: score,
          level: level,
        };
        await updateDoc(doc.ref, newData);
        console.log("Wynik quizu został zaktualizowany.");
      } else {
        console.log(
          "Nowy wynik jest gorszy od obecnego wyniku, nie dokonano aktualizacji."
        );
      }
    } else {
      try {
        await addDoc(collection(db, "leaderboard"), {
          name: displayName,
          score: score,
          level: level,
        });
        console.log("Tworzę nowy rekord");
      } catch (err) {
        alert(err);
      }
    }
  } catch (error) {
    console.error(
      "Błąd podczas wyszukiwania i aktualizacji wyniku quizu:",
      error
    );
  }
};

export default addScore;
