"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import {
  ref,
  onValue,
  set,
  remove,
  push,
  serverTimestamp,
} from "firebase/database";

export default function ActiveSessionsCounter() {
  const [activeSessions, setActiveSessions] = useState(0);

  useEffect(() => {
    const sessionsRef = ref(db, "activeSessions");
    const newSessionRef = push(sessionsRef);
    set(newSessionRef, { createdAt: serverTimestamp() });

    const unsubscribe = onValue(sessionsRef, (snapshot) => {
      const data = snapshot.val();
      setActiveSessions(data ? Object.keys(data).length : 0);
    });

    const handleUnload = () => {
      remove(newSessionRef);
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      remove(newSessionRef);
      unsubscribe();
    };
  }, []);

  return (
    <div style={{ padding: "0 10px", fontWeight: "bold" }}>
      Активные сессии: {activeSessions}
    </div>
  );
}
