"use client";

import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setSearchOrderTerm,
  setSearchProductTerm,
} from "../../../storage/mainReducer";

export function useSearchHandler() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  function searchHandler(value: string) {
    if (pathname === "/") {
      dispatch(setSearchOrderTerm(value));
    } else if (/^\/\d+$/.test(pathname)) {
      dispatch(setSearchProductTerm(value));
    }
  }

  return { searchHandler };
}
