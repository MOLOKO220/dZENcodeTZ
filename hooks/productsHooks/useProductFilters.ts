import { useMemo, useState, useEffect } from "react";
import { ProductType } from "@/types/types";

interface UseProductFiltersProps {
  products: ProductType[];
  searchTerm?: string;
}

export function useProductFilters({
  products,
  searchTerm = "",
}: UseProductFiltersProps) {
  const [typesSelect, setTypesSelect] = useState("all");
  const [specSelect, setSpecSelect] = useState("all");

  // select filter by types
  const types = useMemo(
    () => Array.from(new Set(products.map((p) => p.type))),
    [products]
  );
  // select filter by specifications
  const specifications = useMemo(
    () => Array.from(new Set(products.map((p) => p.specification))),
    [products]
  );

  // main filtering data
  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(products);

  useEffect(() => {
    const filtered = products.filter((p) => {
      if (typesSelect !== "all" && specSelect !== "all") {
        return p.type === typesSelect && p.specification === specSelect;
      }
      if (typesSelect !== "all") return p.type === typesSelect;
      if (specSelect !== "all") return p.specification === specSelect;
      return true;
    });

    // filter by input from header
    const searchFiltered = filtered.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(searchFiltered);
  }, [products, typesSelect, specSelect, searchTerm]);

  return {
    types,
    specifications,
    typesSelect,
    specSelect,
    setTypesSelect,
    setSpecSelect,
    filteredProducts,
  };
}
