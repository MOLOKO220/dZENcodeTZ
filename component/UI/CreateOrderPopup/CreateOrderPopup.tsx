"use client";

import React, { useState, useEffect } from "react";
import styles from "./CreateOrderPopup.module.scss";

import useCreateOrder from "./hooks/useCreateOrder";

export default function CreateOrderPopup() {
  const [open, setOpen] = useState(false);
  const { title, setTitle, error, inputRef, createOrder } = useCreateOrder(() =>
    setOpen(false)
  );

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  return (
    <>
      <button className={styles.addButton} onClick={() => setOpen(true)}>
        <div>+</div>
      </button>

      <div
        className={`${styles.Orders__popup} ${
          open ? styles.Orders__popup__active : ""
        }`}
      >
        <div>
          <h5>Создать заказ!</h5>
          <label>
            <input
              ref={inputRef}
              type="text"
              placeholder="Название заказа"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={error ? styles.Orders__popup__errorInput : ""}
            />
            <p className={error ? styles.Orders__popup__errorText : ""}>
              Название должно содержать больше 4 символов
            </p>
          </label>
          <footer>
            <button onClick={() => setOpen(false)}>Отмена</button>
            <button onClick={createOrder}>Создать</button>
          </footer>
        </div>
      </div>
    </>
  );
}
