"use client";

import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import nextId from "react-id-generator";

import { createOrderThunk } from "@/storage/mainReducer";

export default function useCreateOrder(onClose?: () => void) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const createOrder = async () => {
    // little validation
    if (title.trim().length < 4) {
      setError("Title слишком короткий");
      setTimeout(() => setError(null), 2500);
      return;
    }

    const d = new Date();
    const newOrder = {
      id: nextId(),
      title: title.trim(),
      date: d.toISOString(),
      products: [],
    };

    try {
      await dispatch(createOrderThunk(newOrder) as any).unwrap();
      setTitle("");
      setError(null);

      if (onClose) onClose(); // close popup
    } catch (err: any) {
      console.error("Server error:", err);
      setError(err?.error ? JSON.stringify(err.error) : "Неизвестная ошибка");
    }
  };

  return { title, setTitle, error, inputRef, createOrder };
}
