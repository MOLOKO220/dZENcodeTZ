"use client";

import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import nextId from "react-id-generator";

import { addOrder } from "@/storage/mainReducer";

export default function useCreateOrder(onClose?: () => void) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const createOrder = () => {
    // little validation
    if (title.trim().length < 4) {
      setError(true);
      setTimeout(() => setError(false), 2500);
      return;
    }

    const d = new Date();
    const newOrder = {
      id: nextId(),
      title: title.trim(),
      date: d.toISOString(),
      description: "it's not implemented",
      products: [],
    };

    dispatch(addOrder(newOrder));
    setTitle("");
    setError(false);

    if (onClose) onClose(); // close popup
  };

  return { title, setTitle, error, inputRef, createOrder };
}
