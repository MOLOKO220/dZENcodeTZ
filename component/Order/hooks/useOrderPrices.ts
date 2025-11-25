import { useMemo } from "react";
import type { ProductType } from "@/types/types";

export function useOrderPrices(products: ProductType[]) {
  return useMemo(() => {
    let USD = 0;
    let UAH = 0;

    products.forEach((p) => {
      USD += p.price[0].value;
      UAH += p.price[1].value;
    });

    return { USD, UAH };
  }, [products]);
}
