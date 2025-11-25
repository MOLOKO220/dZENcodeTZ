"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./DeleteButton.module.scss";

type Props = {
  onConfirm: () => void;
  label?: string;
};

export default function DeleteButton({ onConfirm, label = "Удалить?" }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const open = useCallback(() => {
    dialogRef.current?.classList.add(styles.dialogActive);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.classList.remove(styles.dialogActive);
  }, []);

  // ESC close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <>
      <button className={styles.iconBtn} onClick={open} aria-label="Delete">
        <Image
          src="/trashCan.png"
          alt="delete"
          width={20}
          height={20}
          priority
        />
      </button>

      <div
        className={styles.dialog}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.dialogInner}>
          <h4>{label}</h4>

          <div className={styles.actions}>
            <button className={styles.cancel} onClick={close}>
              ОТМЕНИТЬ
            </button>

            <button
              className={styles.confirm}
              onClick={() => {
                onConfirm();
                close();
              }}
            >
              УДАЛИТЬ
            </button>
          </div>

          <button className={styles.closeX} onClick={close} aria-label="Close">
            ✕
          </button>
        </div>
      </div>
    </>
  );
}
