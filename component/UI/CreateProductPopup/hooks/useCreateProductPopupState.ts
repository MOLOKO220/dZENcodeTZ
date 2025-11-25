import { useState } from "react";

export function useCreateProductPopupState() {
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [priceUSD, setPriceUSD] = useState<number | "">("");
  const [typeValue, setTypeValue] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [guaranteeStart, setGuaranteeStart] = useState("");
  const [guaranteeEnd, setGuaranteeEnd] = useState("");

  // errors
  const [errTitle, setErrTitle] = useState("");
  const [errStart, setErrStart] = useState("");
  const [errEnd, setErrEnd] = useState("");

  const open = () => setIsOpen(true);

  const close = () => {
    setIsOpen(false);
    setTitle("");
    setPriceUSD("");
    setGuaranteeStart("");
    setGuaranteeEnd("");
    setErrTitle("");
    setErrStart("");
    setErrEnd("");
  };

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === "") return setPriceUSD("");
    if (!v.match(/[^0-9.]/g)) setPriceUSD(Number(v));
  };

  return {
    isOpen,
    open,
    close,

    title,
    setTitle,

    priceUSD,
    onPriceChange,

    typeValue,
    setTypeValue,

    specValue,
    setSpecValue,

    guaranteeStart,
    setGuaranteeStart,

    guaranteeEnd,
    setGuaranteeEnd,

    errTitle,
    setErrTitle,

    errStart,
    setErrStart,

    errEnd,
    setErrEnd,
  };
}
