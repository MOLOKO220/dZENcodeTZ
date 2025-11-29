"use client";
import { useEffect, useState } from "react";

const days = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export function useDateTime() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted || !now) return { day: "", date: "", time: "" };

  const day = days[now.getDay()];
  const date = now.toLocaleString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const time = `${hours}:${minutes}`;

  return { day, date, time };
}
