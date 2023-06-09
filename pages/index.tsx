import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import nextId from "react-id-generator";
import { addOrder } from "../storage/mainReducer";

import Order from "../component/Order/Order";

export default function index() {
  // redux
  interface ordersType {
    id: number;
    title: string;
    date: string;
    description: string;
    products: any;
  }

  const orders: ordersType[] = useSelector((state: any) => state.main.orders);
  const dispatch = useDispatch();

  // hooks
  const [popupOrderTitle, setPopupOrderTitle] = useState("");
  const popupWrapp = useRef<HTMLDivElement>(null);

  // popup
  function openPopup() {
    popupWrapp.current?.classList.add("Orders__popup__active");
  }

  function closePopup() {
    popupWrapp.current?.classList.remove("Orders__popup__active");
    setPopupOrderTitle("");
  }

  function createNewOrder() {
    const d = new Date();
    // фармеруем объект
    const newOrder = {
      id: nextId(),
      title: popupOrderTitle,
      date: d.toISOString(),
      description: "it's not implemented",
      products: [],
    };
    // проверка на количество символов
    if (popupOrderTitle.length > 4) {
      dispatch(addOrder(newOrder));
      popupWrapp.current?.classList.remove("Orders__popup__active");

      setPopupOrderTitle("");
    } else {
      popupWrapp.current?.classList.add("Orders__popup__error");
      setTimeout(() => {
        popupWrapp.current?.classList.remove("Orders__popup__error");
      }, 3000);
    }
  }

  return (
    <main className="Orders">
      <header>
        <div onClick={openPopup}>
          <div>+</div>
        </div>
        <h1>Приходы / {orders.length}</h1>
      </header>
      <ul>
        {orders.map((el) => {
          return <Order key={el.id} data={el} />;
        })}
      </ul>
      <div className="Orders__popup" ref={popupWrapp}>
        <div>
          <h5>Создать заказ!</h5>
          <label>
            <input
              type="text"
              placeholder="Названия заказа"
              onChange={(e) => {
                setPopupOrderTitle(e.target.value);
              }}
              value={popupOrderTitle}
            />
            <p>Названия должно содержать больше 4 символов</p>
          </label>
          <footer>
            <button onClick={closePopup}>Отмена</button>
            <button onClick={createNewOrder}>Создать</button>
          </footer>
        </div>
      </div>
    </main>
  );
}
