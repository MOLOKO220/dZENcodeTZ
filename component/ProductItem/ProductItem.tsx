import style from "./ProductItem.module.scss";
import Image from "next/image";

import type { ProductType } from "@/types/types";

import { useDispatch } from "react-redux";
import { deleteProductThunk } from "@/storage/mainReducer";
// utils
import { formatDate } from "@/utils/formatDate";
// components
import DeleteButton from "component/UI/DeleteButton/DeleteButton";

interface ProductItemProps {
  product: ProductType;
  orderTitle: string;
}

export default function ProductItem({ product, orderTitle }: ProductItemProps) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteProductThunk({ orderId: product.orderId, productId: product.id }) as any);
    } catch (err) {
      console.error('[TRACE deleteProduct] dispatch failed', err);
    }
  };

  const priceUSD = product.price.find((p) => p.symbol === "USD")?.value ?? 0;
  const priceUAH = product.price.find((p) => p.symbol === "UAH")?.value ?? 0;

  return (
    <li className={style.ProductItem}>
      <div className={style.ProductItem__circle}></div>
      <Image src={`/${product.photo}`} alt="Product" width={60} height={60} />

      <div className={style.ProductItem__title}>
        <h3>{product.title}</h3>
        <h4>{product.type}</h4>
        {product.specification}
      </div>

      <div className={style.ProductItem__guarantee}>
        <div>
          с <span>{formatDate(product.guarantee.start, 1)}</span>
        </div>
        <div>
          по <span>{formatDate(product.guarantee.end, 1)}</span>
        </div>
      </div>

      <div className={style.ProductItem__price}>
        <p>{priceUSD} $</p>
        <div>{priceUAH} UAH</div>
      </div>

      <div className={style.ProductItem__orderTitle}>{orderTitle}</div>

      <div className={style.ProductItem__date}>
        <p>{formatDate(product.date, 3)}</p>
        <div>{formatDate(product.date, 2)}</div>
      </div>

      <DeleteButton
        onConfirm={handleDelete}
        label="Вы уверены, что хотите удалить этот продукт?"
      />
    </li>
  );
}
