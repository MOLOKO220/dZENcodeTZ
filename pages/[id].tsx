import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import nextId from "react-id-generator";
import { addProduct } from "../storage/mainReducer";

import ProductItem from "../component/ProductItem/ProductItem";

export const getServerSideProps = async (contstc: any) => {
  // получаем идентификатор данной страницы (id конкретного заказа)
  return { props: { id: contstc.query.id } };
};

export default function Products(props: any) {
  const idThisOrder = props.id;

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

  // получаем данные данного конкретного заказа
  const dataThisOrder = orders.filter((el) => {
    return el.id == idThisOrder;
  });

  // список продуктов
  const products = dataThisOrder[0]?.products;

  // hooks
  const [showProduct, setShowProduct] = useState(products);

  const [typesSelec, setTypesSelec] = useState("all");
  const [specificationSelect, setSpecificationSelect] = useState("all");

  // получить массив с типами товаров, оставляем только уникальные значения
  const types = useRef<string[]>(
    Array.from(
      new Set(
        products?.map((el: any) => {
          return el.type;
        })
      )
    )
  );
  const specification = useRef<string[]>(
    Array.from(
      new Set(
        products?.map((el: any) => {
          return el.specification;
        })
      )
    )
  );

  // фильтруем продукты по типу и спецификации
  useEffect(() => {
    if (typesSelec != "all" || specificationSelect != "all") {
      const filteredProducts = products.filter((el: any) => {
        if (typesSelec === "all" && specificationSelect !== "all") {
          return el.specification === specificationSelect;
        }
        if (specificationSelect === "all" && typesSelec !== "all") {
          return el.type === typesSelec;
        }
        if (typesSelec !== "all" && specificationSelect !== "all") {
          return (
            el.type === typesSelec && el.specification === specificationSelect
          );
        }
      });
      setShowProduct(filteredProducts);
    } else {
      setShowProduct(products);
    }
  }, [typesSelec, specificationSelect, orders]);

  // popup !! !! !!
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
      orderId: idThisOrder,
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

  return (
    <section className="Products">
      <header>
        <h1>Продукты / {dataThisOrder[0]?.products.length}</h1>
        <div>
          <div>
            <p>Тип:</p>
            <select
              onChange={(e) => {
                setTypesSelec(e.target.value);
              }}
            >
              <option value="all">all</option>

              {types.current.map((el) => {
                return (
                  <option key={el} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <p>Спецификация:</p>
            <select
              onChange={(e) => {
                return setSpecificationSelect(e.target.value);
              }}
            >
              <option value="all">all</option>
              {specification.current.map((el) => {
                return (
                  <option key={el} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button onClick={openPopup}>Добавить товар</button>
      </header>

      <ul>
        {showProduct?.map((el: any) => {
          return (
            <ProductItem
              key={el.id}
              date={el.date}
              guaranteeEnd={el.guarantee.end}
              guaranteeSart={el.guarantee.start}
              id={el.id}
              img={el.photo}
              orderTitle={dataThisOrder[0].title}
              orderId={dataThisOrder[0].id}
              title={el.title}
              type={el.type}
              priceUSD={el.price[0].value}
              priceUAH={el.price[1].value}
              specification={el.specification}
            />
          );
        })}
      </ul>

      <div className="Products__popup " ref={popupWrapp}>
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
    </section>
  );
}
