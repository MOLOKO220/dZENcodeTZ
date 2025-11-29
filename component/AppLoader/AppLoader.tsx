"use client";

import React, { useEffect } from "react";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersThunk } from "../../storage/mainReducer";

import type { StoreType } from "../../types/types";

type Props = {
  children: React.ReactNode;
};

export default function AppLoader({ children }: Props) {
  const dispatch = useDispatch<any>();
  const loading = useSelector((s: { main: StoreType }) => s.main.loading);

  useEffect(() => {
    (async () => {
      try {
        const action = await dispatch(getAllOrdersThunk() as any);
      } catch (err) {
        console.error("getAllOrders failed (dispatch threw):", err);
      }
    })();
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}
      >
        <Image src="/loading.gif" height={150} width={150} alt="Loading..." />
      </div>
    );
  }

  return <>{children}</>;
}
