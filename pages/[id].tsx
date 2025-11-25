import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import type { OrderType, ProductType } from "../types/types";

import { useProductFilters } from "@/hooks/productsHooks/useProductFilters";
// Components
import ProductItem from "../component/ProductItem/ProductItem";
import CreateProductPopup from "../component/UI/CreateProductPopup/CreateProductPopup";

export default function Products() {
  const router = useRouter();
  const { id } = router.query;

  // loading
  if (!id || typeof id !== "string") {
    return <p>Загрузка...</p>;
  }

  // Redux
  const orders: OrderType[] = useSelector((state: any) => state.main.orders);
  const searchProductTerm: string = useSelector(
    (state: any) => state.main.searchProductTerm
  );

  const dataThisOrder = orders.find((el) => el.id === id);

  // if order not found
  if (!dataThisOrder) {
    return (
      <section className="Products">
        <h1>Ошибка</h1>
        <p>
          ❗ Заказ с ID <strong>{id}</strong> не найден.
        </p>
      </section>
    );
  }

  // products by this order
  const products: ProductType[] = dataThisOrder.products ?? [];

  // filtering
  const {
    types,
    specifications,
    typesSelect,
    specSelect,
    setTypesSelect,
    setSpecSelect,
    filteredProducts,
  } = useProductFilters({ products, searchTerm: searchProductTerm });

  return (
    <section className="Products">
      <header>
        <h1>Продукты / {products.length}</h1>

        <div>
          <div>
            <p>Тип:</p>
            <select
              value={typesSelect}
              onChange={(e) => setTypesSelect(e.target.value)}
            >
              <option value="all">all</option>
              {types.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p>Спецификация:</p>
            <select
              value={specSelect}
              onChange={(e) => setSpecSelect(e.target.value)}
            >
              <option value="all">all</option>
              {specifications.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
        </div>

        <CreateProductPopup orderId={id} />
      </header>

      {products.length === 0 ? (
        <div className="empty-products">
          <p>В этом заказе пока нет товаров.</p>
          <p>Добавьте продукт, чтобы начать.</p>
        </div>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              orderTitle={dataThisOrder.title}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
