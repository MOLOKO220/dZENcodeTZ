import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import style from "./Order.module.scss";
import { useDispatch } from "react-redux";
import { removaOrder } from "../../storage/mainReducer";

interface propsType {
  data: {
    id: number;
    title: string;
    date: string;
    description: string;
    products: any;
  };
}
export default function Order(props: propsType) {
  // hooks
  // Popup
  const RemovePopup = useRef<HTMLDialogElement>(null);

  //Prices
  const [USD, setUSD] = useState<number>(0);
  const [UAH, setUAH] = useState<number>(0);

  useEffect(() => {
    // перебрать все продукты и сумируем цены
    let allUsd = 0;
    let allUah = 0;
    props.data.products.map((el: any) => {
      allUsd = allUsd + el.price[0].value;
      allUah = allUah + el.price[1].value;
    });
    setUSD(allUsd);
    setUAH(allUah);
  }, []);

  // redux
  const dispatch = useDispatch();

  // Popup
  function showRemovePopup() {
    RemovePopup.current?.classList.add(style.removePopup__active);
  }
  function closeRemovePopup() {
    RemovePopup.current?.classList.remove(style.removePopup__active);
  }
  // удаляем заказ
  function deleteOreder() {
    dispatch(removaOrder(props.data.id));
  }

  //Date
  function dateFormat(date: string, format: number) {
    const d = new Date(date);
    // 1  формат
    if (format === 1) {
      // принимаем дату и приводим её в цифровой формат: дд/мм/гг
      // добавляем 0 перед датой если она ниже 10, чтобы получить "04" и тд
      return `${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}/${
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1
      }/${d.getFullYear()} `;
    }
    // 2 формат
    if (format === 2) {
      // принимаем дату и приводим её в формат: дд/МЕСЯЦ/гг
      return `${
        d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
      }/${d.toLocaleString("ru", { month: "long" })}/${d.getFullYear()}`;
    }
    // 3 формат
    if (format === 3) {
      // принимаем дату и приводим её в цифровой формат: дд/мм
      return `${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}/${
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1
      }`;
    }
  }

  return (
    <li className={style.Order}>
      <div>
        <h4>{props.data.title}</h4>
      </div>
      <div>
        <Link href={`/${props.data.id}`}>
          <img
            className={style.Order__burgeBtn}
            src="burgeBtn.png"
            alt="show more"
          />
        </Link>
        <div className={style.Order__product}>
          <div>{props.data.products.length}</div>
          <p>Продукта</p>
        </div>
        <div className={style.Order__date}>
          <div>{dateFormat(props.data.date, 3)}</div>
          <p>{dateFormat(props.data.date, 2)}</p>
        </div>
        <div className={style.Order__prices}>
          <div>{USD} $</div>
          <p>{UAH} UAH</p>
        </div>
        <img
          className={style.Order__delete_btn}
          src="trashCan.png"
          alt="Delete"
          onClick={showRemovePopup}
        />
      </div>
      <dialog className={style.Order__removePopup} ref={RemovePopup}>
        <div>
          <header>
            <h5>Вы уверены, что хотите удалить этот приход?</h5>
          </header>
          <main>
            <h6>{props.data.title}</h6>
          </main>
          <footer>
            <button onClick={closeRemovePopup}>ОТМЕНИТЬ</button>
            <button onClick={deleteOreder}>УДАЛИТЬ</button>
          </footer>
          <img
            className={style.Order__removePopup__closeBtn}
            src="closeBtn.webp"
            alt="closeBtn"
            onClick={closeRemovePopup}
          />
        </div>
      </dialog>
    </li>
  );
}
