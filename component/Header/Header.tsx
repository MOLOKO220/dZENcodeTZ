import React, { useRef, useState } from "react";
import style from "./Header.module.scss";
import Link from "next/link";

export default function Header() {
  // hooks
  // this day of week
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const d = new Date();
  const day = useRef(days[d.getDay()]);

  // this date
  const date = useRef(
    d.toLocaleString("ru", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );

  // this time
  const [time, setTime] = useState(`${d.getHours()}:${d.getMinutes()}`);

  setInterval(() => {
    const d = new Date();
    setTime(`${d.getHours()}:${d.getMinutes()}`);
  }, 600);

  return (
    <header className={style.Header}>
      <div className="container">
        <Link href="/">
          <img src="Logo.svg" alt="Logo" />
          <p>INVENTORY</p>
        </Link>
        <input placeholder="Поиск" />
        <div className={style.Header__date_wrapp}>
          <div>{day.current}</div>
          <div>
            <span> {date.current}</span>
            <img src="watch.svg" alt="watch" />
            <span
              onClick={() => {
                console.log(time);
              }}
            >
              {time}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
