import style from "./CreateProductPopup.module.scss";

import { useCreateProductPopupState } from "./hooks/useCreateProductPopupState";
import { useCreateProductLogic } from "./hooks/useCreateProductLogic";

type Props = {
  orderId: string;
};

export default function CreateProductPopup({ orderId }: Props) {
  const popup = useCreateProductPopupState();

  const logic = useCreateProductLogic({
    orderId,
    title: popup.title,
    priceUSD: popup.priceUSD,
    guaranteeStart: popup.guaranteeStart,
    guaranteeEnd: popup.guaranteeEnd,
    typeValue: popup.typeValue,
    specValue: popup.specValue,

    setErrTitle: popup.setErrTitle,
    setErrStart: popup.setErrStart,
    setErrEnd: popup.setErrEnd,

    close: popup.close,
  });

  return (
    <>
      <button onClick={popup.open}>Добавить продукт</button>

      {popup.isOpen && (
        <div className={`${style.popup} ${style.popup_active}`}>
          <div className={style.body}>
            <h5>Создать товар</h5>

            <label className={popup.errTitle ? style.error_title : ""}>
              <input
                type="text"
                placeholder="Название товара"
                value={popup.title}
                onChange={(e) => popup.setTitle(e.target.value)}
              />
              {popup.errTitle && (
                <p className={style.error_message}>{popup.errTitle}</p>
              )}
            </label>

            <label>
              <input
                type="text"
                placeholder="Цена в USD"
                value={popup.priceUSD}
                onChange={popup.onPriceChange}
              />
            </label>

            <div>
              <p>Тип:</p>
              <select
                value={popup.typeValue}
                onChange={(e) => popup.setTypeValue(e.target.value)}
              >
                {(logic.types.length
                  ? logic.types
                  : ["Monitors", "Leptop", "Phone"]
                ).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Спецификация:</p>
              <select
                value={popup.specValue}
                onChange={(e) => popup.setSpecValue(e.target.value)}
              >
                {(logic.specifications.length
                  ? logic.specifications
                  : ["Specification 1", "Specification 2"]
                ).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className={style.CreateProductPopup__date_wrap}>
              <div>
                <p>Гарантия началась:</p>
                <input
                  type="date"
                  value={popup.guaranteeStart}
                  onChange={(e) => popup.setGuaranteeStart(e.target.value)}
                />
              </div>
              {popup.errStart && (
                <p className={style.error_message}>{popup.errStart}</p>
              )}
            </div>

            <div className={style.CreateProductPopup__date_wrap}>
              <div>
                <p>Гарантия закончилась:</p>
                <input
                  type="date"
                  value={popup.guaranteeEnd}
                  onChange={(e) => popup.setGuaranteeEnd(e.target.value)}
                />
              </div>
              {popup.errEnd && (
                <p className={style.error_message}>{popup.errEnd}</p>
              )}
            </div>

            <footer>
              <button onClick={popup.close}>Отмена</button>
              <button onClick={logic.createProduct}>Создать</button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
