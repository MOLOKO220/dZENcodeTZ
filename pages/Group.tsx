import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import nextId from "react-id-generator";
import { removaProduct, addOrder, addProduct } from "../storage/mainReducer";

export default function Group() {
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
  //  hooks

  const productList = useRef<HTMLElement>(null);
  const [displayedOrder, setDisplayedOrder] = useState<ordersType>({
    id: 0,
    title: "null",
    date: "null",
    description: "null",
    products: [],
  });

  useEffect(() => {
    // обновляем состояни
    const newDate = orders.filter((el) => {
      return el.id === displayedOrder.id;
    });
    if (newDate[0] != undefined) setDisplayedOrder(newDate[0]);
  }, [orders]);

  // CreateOrderPopup !!!!!!!!!!!!
  const [popupOrderTitle, setPopupOrderTitle] = useState("");
  const popupCreateOrderWrapp = useRef<HTMLDivElement>(null);

  // CreateOrderPopup
  function openCreateOrderPopup() {
    popupCreateOrderWrapp.current?.classList.add("Group__popup__active");
  }

  function closeCreateOrderPopup() {
    popupCreateOrderWrapp.current?.classList.remove("Group__popup__active");
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
      popupCreateOrderWrapp.current?.classList.remove("Group__popup__active");

      setPopupOrderTitle("");
    } else {
      popupCreateOrderWrapp.current?.classList.add("Group__popup__error");
      setTimeout(() => {
        popupCreateOrderWrapp.current?.classList.remove("Group__popup__error");
      }, 3000);
    }
  }

  // AddNewProdyctPopup !!!!!!!!!!!!
  const popupWrapp = useRef<HTMLDivElement>(null);

  // title and price
  const [popupProductsTitle, setPopupProductsTitle] = useState("");
  const [popupProductsPrice, setPopupProductsPrice] = useState(0);

  // select
  const [popupTypesSelec, setPopupTypesSelec] = useState("Monitors");
  const [popupSpecificationSelect, setPopupSpecificationSelect] =
    useState("Specification 1");

  // guarantee date
  const [popupGuaranteeStart, setPopupGuaranteeStart] = useState("");
  const [popupGuaranteeEnd, setPopupGuaranteeEnd] = useState("");

  function openPopup() {
    popupWrapp.current?.classList.add("Products__popup__active");
  }

  function closePopup() {
    popupWrapp.current?.classList.remove("Products__popup__active");
    setPopupProductsTitle("");
  }

  // маска инпута, пропускает только цифры
  function inputMaskOnliNumber(e: any) {
    if (!e.target.value.match(/[^0-9\.]/g)) {
      setPopupProductsPrice(Number(e.target.value));
    } else {
    }
  }

  function createNewProduct() {
    const d = new Date();
    // фармеруем объект
    const newProduct = {
      id: nextId(),
      photo: "pathToFile.jpg",
      title: popupProductsTitle,
      type: popupTypesSelec,
      specification: popupSpecificationSelect,
      guarantee: {
        start: popupGuaranteeStart,
        end: popupGuaranteeEnd,
      },
      price: [
        { value: popupProductsPrice, symbol: "USD" },
        { value: popupProductsPrice * 40, symbol: "UAH" },
      ],
      orderId: displayedOrder.id,
      date: d.toISOString(),
    };

    // небольшая валидация
    let cautValid = 0;
    // валидация title
    if (popupProductsTitle.length > 4) {
      cautValid++;
    } else {
      popupWrapp.current?.classList.add("Products__popup_error_title");
      setTimeout(() => {
        popupWrapp.current?.classList.remove("Products__popup_error_title");
      }, 3000);
    }

    // валидация guarantee date
    if (popupGuaranteeStart != "") {
      cautValid++;
    } else {
      popupWrapp.current?.classList.add("Products__popup_error_GuaranteeStart");
      setTimeout(() => {
        popupWrapp.current?.classList.remove(
          "Products__popup_error_GuaranteeStart"
        );
      }, 3000);
    }
    if (popupGuaranteeEnd != "") {
      cautValid++;
    } else {
      popupWrapp.current?.classList.add("Products__popup_error_GuaranteeEnd");
      setTimeout(() => {
        popupWrapp.current?.classList.remove(
          "Products__popup_error_GuaranteeEnd"
        );
      }, 3000);
    }

    if (cautValid === 3) {
      // отправка
      dispatch(addProduct(newProduct));
      popupWrapp.current?.classList.remove("Products__popup__active");
      // очистка полей
      setPopupProductsTitle("");
      setPopupProductsPrice(0);
      setPopupGuaranteeStart("");
      setPopupGuaranteeEnd("");
    }
  }

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

  // удаляем продукта
  function deleteProduct(e: any) {
    dispatch(
      removaProduct({
        id: e.target.dataset.id,
        orderId: e.target.dataset.orderid,
      })
    );
  }

  function openOrder(e: any) {
    // e.stopPropagation();
    // нелепая конструкция, нужна для борьбы с влиянием, e.target берет дата-атрибут именно с того блока по которому нажали
    let orderId = e.target.dataset.id;
    let thisBlock = e.target;
    if (e.target.dataset.id === undefined) {
      orderId = e.target.parentElement.dataset.id;
      thisBlock = e.target.parentElement;
      if (e.target.parentElement.dataset.id === undefined) {
        orderId = e.target.parentElement.parentElement.dataset.id;
        thisBlock = e.target.parentElement.parentElement;
      }
    }
    const thisOrder = orders.filter((el) => {
      return el.id == orderId;
    });

    setDisplayedOrder(thisOrder[0]);
    // productList.current?.classList.add("display_block");
    setTimeout(() => {
      productList.current?.classList.add("Group__product_list__active");
    }, 100);
    // удалить анимацию с остальных OrderItem
    const allOrderItem = document.querySelectorAll(".Group__OrderItem");
    allOrderItem.forEach((el) => {
      el.classList.remove("Group__OrderItem_acive");
    });
    thisBlock.classList.add("Group__OrderItem_acive");
  }

  return (
    <main className="Group">
      <header>
        <div onClick={openCreateOrderPopup}>
          <div>+</div>
        </div>
        <h1
          onClick={() => {
            console.log(displayedOrder);
          }}
        >
          Приходы / {orders.length}
        </h1>
      </header>
      <main>
        <ul>
          {orders.map((el) => {
            return (
              <li
                className="Group__OrderItem"
                data-id={el.id}
                key={el.id}
                onClick={openOrder}
              >
                <div className="Group__OrderItem__quantityProduct">
                  <div>{el.products.length}</div>
                  Продукта
                </div>
                <div className="Group__OrderItem__Date">
                  {dateFormat(el.date, 3)}
                  <div>{dateFormat(el.date, 2)}</div>
                </div>
                <div className="Group__OrderItem__arrow">
                  <img src="grupeArrow.svg" alt="arrow" />
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <aside className="Group__product_list" ref={productList}>
        <h3>{displayedOrder!.title}</h3>
        <div className="Group__product_list__add_product" onClick={openPopup}>
          <span>+</span>Добавить продукт
        </div>
        <ul>
          {displayedOrder.products.map((el: any) => {
            return (
              <li key={el.id}>
                <img src={el.photo} alt="photo" />
                <div>
                  <h6>{el.title}</h6>
                  {el.type}
                </div>
                <p>
                  <span>{el.price[0].value}$</span>
                  <br />
                  {el.price[1].value}UAH
                </p>
                <img
                  src="trashCan.png"
                  alt="remove"
                  className="removeBtn"
                  data-orderid={el.orderId}
                  data-id={el.id}
                  onClick={deleteProduct}
                />
              </li>
            );
          })}
        </ul>
        <img
          src="closeBtn.webp"
          alt="closeBtn"
          onClick={() => {
            productList.current?.classList.remove(
              "Group__product_list__active"
            );
            const allOrderItem = document.querySelectorAll(".Group__OrderItem");
            allOrderItem.forEach((el) => {
              el.classList.remove("Group__OrderItem_acive");
            });
          }}
        />
      </aside>
      <div className="Group__popup" ref={popupCreateOrderWrapp}>
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
            <button onClick={closeCreateOrderPopup}>Отмена</button>
            <button onClick={createNewOrder}>Создать</button>
          </footer>
        </div>
      </div>
      <div className="Products__popup" ref={popupWrapp}>
        <div>
          <h5>Создать заказ!</h5>
          <label className="Products__popup_title">
            <input
              type="text"
              placeholder="Названия заказа"
              onChange={(e) => {
                setPopupProductsTitle(e.target.value);
              }}
              value={popupProductsTitle}
            />
            <p>Названия должно содержать больше 4 символов</p>
          </label>

          <label>
            <input
              type="text"
              placeholder="Цена в USD"
              onChange={inputMaskOnliNumber}
              value={popupProductsPrice}
            />
          </label>

          <div>
            <p>Тип:</p>
            <select
              onChange={(e) => {
                setPopupTypesSelec(e.target.value);
              }}
            >
              <option value="Monitors">Monitors</option>
              <option value="Leptop">Leptop</option>
              <option value="Phone">Phone</option>
            </select>
          </div>

          <div>
            <p>Спецификация:</p>
            <select
              onChange={(e) => {
                return setPopupSpecificationSelect(e.target.value);
              }}
            >
              <option value="Specification 1">Specification 1</option>
              <option value="Specification 2">Specification 2</option>
              <option value="Specification 3">Specification 3</option>
              <option value="Specification 4">Specification 4</option>
            </select>
          </div>

          <div className="Products__popup_date GuaranteeStart">
            <p>Гарантия началась:</p>
            <input
              type="date"
              value={popupGuaranteeStart}
              onChange={(e) => {
                setPopupGuaranteeStart(e.target.value);
              }}
            />
          </div>

          <div className="Products__popup_date GuaranteeEnd">
            <p>Гарантия закончилась:</p>
            <input
              type="date"
              value={popupGuaranteeEnd}
              onChange={(e) => {
                setPopupGuaranteeEnd(e.target.value);
              }}
            />
          </div>
          <footer>
            <button onClick={closePopup}>Отмена</button>
            <button onClick={createNewProduct}>Создать</button>
          </footer>
        </div>
      </div>
    </main>
  );
}
