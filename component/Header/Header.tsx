"use client";

import Link from "next/link";
import Image from "next/image";
import style from "./Header.module.scss";

import { useDateTime } from "./hooks/useDateTime";
import { useSearchHandler } from "./hooks/useSearchHandler";

export default function Header() {
  const { day, date, time } = useDateTime();
  const { searchHandler } = useSearchHandler();

  return (
    <header className={style.Header}>
      <div className="container">
        <Link href="/">
          <Image src="/Logo.svg" width={40} height={40} alt="Logo" />
          <p>INVENTORY</p>
        </Link>

        <input
          placeholder="Поиск"
          onChange={(e) => searchHandler(e.target.value)}
        />

        <div className={style.Header__date_wrapp}>
          <div>{day}</div>
          <div>
            <span>{date}</span>
            <Image src="/watch.svg" width={16} height={16} alt="watch" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
