import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import type { OrderType } from "../types/types";
// Components
import Order from "../component/Order/Order";
import CreateOrderPopup from "component/UI/CreateOrderPopup/CreateOrderPopup";

export default function OrdersPage() {
  // Redux
  const orders: OrderType[] = useSelector((state: any) => state.main.orders);
  const searchOrderTerm: string = useSelector(
    (state: any) => state.main.searchOrderTerm
  );

  // filtering orders by input from header
  const filteredOrders = useMemo(() => {
    const term = searchOrderTerm.toLowerCase();
    return orders.filter((order) => 
      order.title ? order.title.toLowerCase().includes(term) : false
    );
  }, [orders, searchOrderTerm]);

  return (
    <main className="Orders">
      <header>
        <CreateOrderPopup />
        <h1>Приходы / {orders.length}</h1>
      </header>

      {filteredOrders.length === 0 ? (
        <p>
          Упс... Здесь пока нет приходов. Чтобы создать приход, нажмите на
          кнопку "Создать приход" в шапке.
        </p>
      ) : (
        <ul>
          {filteredOrders.map((el) => (
            <Order key={el.id} data={el} />
          ))}
        </ul>
      )}
    </main>
  );
}
