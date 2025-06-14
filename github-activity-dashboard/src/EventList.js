import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setEvents(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>GitHub Events</h2>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul>
          {events.map((e, i) => (
            <li key={i}>
              <strong>{e.actor}</strong> performed a <strong>{e.type}</strong> on{" "}
              <strong>{e.repo}</strong> at {new Date(e.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;
