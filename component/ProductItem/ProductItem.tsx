import React, { useRef } from "react";
import style from "./ProductItem.module.scss";
import { useDispatch } from "react-redux";

import { removaProduct } from "../../storage/mainReducer";

interface ProductItemType {
  img: string;
  title: string;
  type: string;
  guaranteeSart: string;
  guaranteeEnd: string;
  priceUSD: number;
  priceUAH: number;
  orderTitle: string;
  date: string;
  id: number;
  orderId: number;
  specification: string;
}

export default function ProductItem(props: ProductItemType) {
  // hooks
  const RemovePopup = useRef<HTMLDialogElement>(null);

  // redux
  const dispatch = useDispatch();

  //Date
  function dateFormat(date: string, format: number) {
    // 1  формат
    const d = new Date(date);
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

  // Popup
  function showRemovePopup() {
    RemovePopup.current?.classList.add(style.removePopup__active);
  }
  function closeRemovePopup() {
    RemovePopup.current?.classList.remove(style.removePopup__active);
  }
  // удаляем продукта
  function deleteProduct() {
    dispatch(removaProduct({ id: props.id, orderId: props.orderId }));
  }
  return (
    <li className={style.ProductItem}>
      <div className={style.ProductItem__circle}></div>
      <img src="pathToFile.jpg" alt="Product" />
      <div className={style.ProductItem__title}>
        <h3>{props.title}</h3>
        <h4>{props.type}</h4>
        {props.specification}
      </div>
      <div className={style.ProductItem__guarantee}>
        <div>
          с <span>{dateFormat(props.guaranteeSart, 1)}</span>
        </div>
        <div>
          по <span>{dateFormat(props.guaranteeEnd, 1)}</span>
        </div>
      </div>
      <div className={style.ProductItem__price}>
        <p>{props.priceUSD} $</p>
        <div>{props.priceUAH} UAH</div>
      </div>
      <div className={style.ProductItem__orderTitle}>{props.orderTitle}</div>
      <div className={style.ProductItem__date}>
        <p>{dateFormat(props.date, 3)}</p>
        <div>{dateFormat(props.date, 2)}</div>
      </div>
      <img
        src="trashCan.png"
        onClick={showRemovePopup}
        className={style.ProductItem__removeBtn}
      />
      <dialog className={style.ProductItem__removePopup} ref={RemovePopup}>
        <div>
          <header>
            <h5>Вы уверены, что хотите удалить этот приход?</h5>
          </header>
          <main>
            <h6>{props.title}</h6>
          </main>
          <footer>
            <button onClick={closeRemovePopup}>ОТМЕНИТЬ</button>
            <button onClick={deleteProduct}>УДАЛИТЬ</button>
          </footer>
          <img
            className={style.ProductItem__removePopup__closeBtn}
            src="closeBtn.webp"
            alt="closeBtn"
            onClick={closeRemovePopup}
          />
        </div>
      </dialog>
    </li>
  );
}
