import React, { useRef } from "react";
import styles from "./NuvMenu.module.scss";
import Link from "next/link";

export default function NuvMenu() {
  // hooks
  const NuvMenuWrapp = useRef<HTMLDivElement>(null);
  const arrowBtn = useRef<HTMLImageElement>(null);

  function showMenu() {
    NuvMenuWrapp.current?.classList.toggle(styles.NuvMenu__active);
    arrowBtn.current?.classList.toggle(styles.NuvMenu__arrow_btn_active);
  }

  return (
    <div className={styles.NuvMenu} ref={NuvMenuWrapp}>
      <div>
        <div className={styles.NuvMenu__user_wrapp}>
          <img src="user.jpg" alt="user" />
          <div>
            <img src="gear.svg" alt="gear" />
          </div>
        </div>
        <ul>
          <li>
            <Link href="/">ПРИХОД</Link>
          </li>
          <li>
            <Link href="#">ГРУППЫ</Link>
          </li>
          <li>
            <Link href="#">ПРОДУКТЫ</Link>
          </li>
          <li>
            <Link href="#">ПОЛЬЗОВАТЕЛИ</Link>
          </li>
          <li>
            <Link href="#">НАСТРОЙКИ</Link>
          </li>
        </ul>
        <img
          className={styles.NuvMenu__arrow_btn}
          src="arrow.png"
          alt="arrow"
          ref={arrowBtn}
          onClick={showMenu}
        />
      </div>
    </div>
  );
}
