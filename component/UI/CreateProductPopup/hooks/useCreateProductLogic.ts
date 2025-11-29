import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import nextId from "react-id-generator";

import { createProductThunk } from "@/storage/mainReducer";

import type { ProductType, OrderType } from "@/types/types";

interface Params {
  orderId: string;
  title: string;
  priceUSD: number | "";
  guaranteeStart: string;
  guaranteeEnd: string;
  typeValue: string;
  specValue: string;

  setErrTitle: (v: string) => void;
  setErrStart: (v: string) => void;
  setErrEnd: (v: string) => void;

  close: () => void;
}

const DEFAULT_TYPES = ["Monitors", "Leptop", "Phone"];
const DEFAULT_SPECS = [
  "Specification 1",
  "Specification 2",
  "Specification 3",
  "Specification 4",
];

export function useCreateProductLogic(params: Params) {
  const {
    orderId,
    title,
    priceUSD,
    guaranteeStart,
    guaranteeEnd,
    typeValue,
    specValue,
    setErrTitle,
    setErrStart,
    setErrEnd,
    close,
  } = params;

  const dispatch = useDispatch();
  const orders: OrderType[] = useSelector((state: any) => state.main.orders);

  const thisOrder = orders.find((o) => String(o.id) === String(orderId));
  const products = thisOrder?.products ?? [];

  // options for selects
  const types = useMemo(() => {
    const fromProducts = Array.from(new Set(products.map((p) => p.type)));
    const all = [...DEFAULT_TYPES, ...fromProducts].filter(Boolean);
    return Array.from(new Set(all));
  }, [products]);

  const specifications = useMemo(() => {
    const fromProducts = Array.from(
      new Set(products.map((p) => p.specification))
    );
    const all = [...DEFAULT_SPECS, ...fromProducts].filter(Boolean);
    return Array.from(new Set(all));
  }, [products]);

  // default values
  const typeDefault = typeValue || types[0] || "";
  const specDefault = specValue || specifications[0] || "";

  const createProduct = async () => {
    // some validation
    let valid = true;

    if (title.trim().length < 4) {
      setErrTitle("Название должно быть больше 4 символов");
      valid = false;
    } else setErrTitle("");

    if (!guaranteeStart) {
      setErrStart("Дата начала гарантии обязательна");
      valid = false;
    } else setErrStart("");

    if (!guaranteeEnd) {
      setErrEnd("Дата окончания гарантии обязательна");
      valid = false;
    } else setErrEnd("");

    if (!valid) return;

    const newProduct: ProductType = {
      id: nextId(),
      photo: "pathToFile.jpg",
      title: title.trim(),
      type: typeDefault,
      specification: specDefault,
      guarantee: { start: guaranteeStart, end: guaranteeEnd },
      price: [
        { value: Number(priceUSD || 0), symbol: "USD" },
        { value: Number(priceUSD || 0) * 40, symbol: "UAH" },
      ],
      orderId,
      date: new Date().toISOString(),
    };

    try {
      await dispatch(
        createProductThunk({ orderId, productData: newProduct }) as any
      );
    } catch (err) {
      console.error(
        "/useCreateProductLogic.ts [createProduct] dispatch failed",
        err
      );
    }
    close();
  };

  return {
    types,
    specifications,
    typeDefault,
    specDefault,
    createProduct,
  };
}
