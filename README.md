Стек: TypeScript, Nextjs, redux(redux-toolkit), jest(RTL), html, scss, react-id-generator.

---

Суть приложения: Отображения групп товара(Order), с возможностью манипуляции: создания и удаления групп, добавления и удаления товаров(ProductItem) в них.

---

## Cтруктура приложения:

### 2 страницы:

- index.tsx - Главная страница, на ней отображаются список группы товара(Order), также на ней есть popup окно для создания новых "Order".

- [id].tsx - Страница конкретной группы товаров, на ней отображается список товаров содержащуюся в данном конкретном Order. Отображает сам список товаров`(<ProductItem/>)`, также есть popup окно для добавления новых товаров(`<ProductItem/>`). И есть два `<select/>` для фильтрации товара по "типам" и "спецификациям".

### 5 компонентов:

- Header - Небольшой компонент, на котором помимо лого отображается текущая дата, день недели и время.

- NuvMenu - Меню навигации, линки на несуществующие страницы,только одна ссылка без заглушки, она ведет на главную страницу(`index.tsx`). Плюс небольшая "анимация", при нажатии на стрелку меню уходит в лево за экран.

- Order - Обёртка группы товаров, в ней отображается информация о группе: название, количество товара в группе, дата создания группы и общая стоимость группы в долларах и гривнах (с курсом 1$ = 40₴). Также тут есть 2 кнопки, burgeBtn - онаже ссылка на `[id].tsx`, и deleteBtn - вызывает popup с подтверждением на удаления данной группы.

- ProductItem - по аналоги с компонентом `<Order/>`, отображает информацию по конкретному продукту: img, название, тип, спецификацию, даты начала и конца гарантии, цена в $ и в ₴, название группы товаров(Order), дата добавления данной единицы товара. Ну и deleteBtn - вызывает popup с подтверждением на удаления данного товара.
- Wrapper - просто обертка для добавления `<NuvMenu />`

дальше storage, с `mainReducer.tsx` - тут вся `redux` логика взаимодействия с хранилищем.

### запуск проекта

Вы попросили меня, описали как можно запустить проект, я запустил его за вас, он доступпен по ссылке https://d-ze-ncode-tz.vercel.app/

Но если вы все же хотите локально запустить на своём компьютере, вам нужно скачать файлы, включаю `package.json`, прописать в консоль `npm i`, подождать установки всех зависимостей, затем прописать в консоль `npm run dev`

P.S. надеюсь я вас правильно понял)))
