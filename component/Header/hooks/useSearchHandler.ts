"use client";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  setSearchOrderTerm,
  setSearchProductTerm,
} from "../../../storage/mainReducer";

export function useSearchHandler() {
  const router = useRouter();
  const dispatch = useDispatch();

  function searchHandler(value: string) {
    const currentPage = router.pathname;

    if (currentPage === "/") {
      dispatch(setSearchOrderTerm(value));
    } else if (currentPage === "/[id]") {
      dispatch(setSearchProductTerm(value));
    }
  }

  return { searchHandler };
}
