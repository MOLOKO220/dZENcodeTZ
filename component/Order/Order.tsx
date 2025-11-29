import Link from "next/link";
import style from "./Order.module.scss";

import { useDispatch } from "react-redux";
import { deleteOrderThunk } from "../../storage/mainReducer";

import type { OrderType } from "../../types/types";
// hooks
import { useOrderPrices } from "./hooks/useOrderPrices";
// utils
import { formatDate } from "../../utils/formatDate";
// components
import DeleteButton from "component/UI/DeleteButton/DeleteButton";

export default function Order({ data }: { data: OrderType }) {
  const { USD, UAH } = useOrderPrices(data.products);

  const dispatch = useDispatch();
  const deleteOrder = async () => {
    try {
      await dispatch(deleteOrderThunk(data.id) as any);
    } catch (err) {
      console.error("[TRACE deleteOrder] dispatch failed", err);
    }
  };

  return (
    <li className={style.Order}>
      <div>
        <h4>{data.title}</h4>
      </div>

      <div>
        <Link href={`/${data.id}`}>
          <img
            className={style.Order__burgeBtn}
            src="burgeBtn.png"
            alt="show more"
          />
        </Link>

        <div className={style.Order__product}>
          <div>{data.products ? data.products.length : "0"}</div>
          <p>Продукта</p>
        </div>

        <div className={style.Order__date}>
          <div>{formatDate(data.date, 3)}</div>
          <p>{formatDate(data.date, 2)}</p>
        </div>

        <div className={style.Order__prices}>
          <div>{USD} $</div>
          <p>{UAH} UAH</p>
        </div>
        <DeleteButton onConfirm={deleteOrder} label="Удалить Order?" />
      </div>
    </li>
  );
}
