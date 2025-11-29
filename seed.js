// seed injection

require("dotenv").config({ path: ".env.local" });
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const ordersData = [
  {
    id: "1",
    title: "Order 1",
    date: "2017-06-29 12:09:33",
    description: "desc",
    products: [
      {
        id: "1",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 1",
        type: "Monitors",
        specification: "Specification 1",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 200, symbol: "USD", isDefault: 0 },
          { value: 8000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "1",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "2",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 2",
        type: "Leptop",
        specification: "Specification 2",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 100, symbol: "USD", isDefault: 0 },
          { value: 4000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "1",
        date: "2017-06-29 12:09:33",
      },
    ],
  },
  {
    id: "2",
    title: "Order 2",
    date: "2017-06-29 12:09:33",
    description: "desc",
    products: [
      {
        id: "1",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 1",
        type: "Monitors",
        specification: "Specification 1",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 200, symbol: "USD", isDefault: 0 },
          { value: 8000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "2",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "2",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 2",
        type: "Leptop",
        specification: "Specification 2",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 50, symbol: "USD", isDefault: 0 },
          { value: 2000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "2",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "3",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 3",
        type: "Phone",
        specification: "Specification 3",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 200, symbol: "USD", isDefault: 0 },
          { value: 8000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "2",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "4",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 4",
        type: "Monitors",
        specification: "Specification 1",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 75, symbol: "USD", isDefault: 0 },
          { value: 3000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "2",
        date: "2017-06-29 12:09:33",
      },
    ],
  },
  {
    id: "3",
    title: "Order 3",
    date: "2017-06-29 12:09:33",
    description: "desc",
    products: [
      {
        id: "1",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 1",
        type: "Monitors",
        specification: "Specification 1",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 200, symbol: "USD", isDefault: 0 },
          { value: 8000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "3",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "2",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 2",
        type: "Leptop",
        specification: "Specification 2",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 50, symbol: "USD", isDefault: 0 },
          { value: 2000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "3",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "3",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 3",
        type: "Leptop",
        specification: "Specification 3",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 125, symbol: "USD", isDefault: 0 },
          { value: 5000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "3",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "4",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 4",
        type: "Monitors",
        specification: "Specification 1",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 25, symbol: "USD", isDefault: 0 },
          { value: 1000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "3",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "5",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 5",
        type: "Phone",
        specification: "Specification 3",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 25, symbol: "USD", isDefault: 0 },
          { value: 1000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "3",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "6",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 6",
        type: "Monitors",
        specification: "Specification 4",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 225, symbol: "USD", isDefault: 0 },
          { value: 9000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "3",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "7",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 7",
        type: "Phone",
        specification: "Specification 3",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 25, symbol: "USD", isDefault: 0 },
          { value: 1000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "3",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "8",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 8",
        type: "Monitors",
        specification: "Specification 1",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 100, symbol: "USD", isDefault: 0 },
          { value: 4000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "3",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "9",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 9",
        type: "Monitors",
        specification: "Specification 3",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 100, symbol: "USD", isDefault: 0 },
          { value: 4000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "3",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "10",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 10",
        type: "Leptop",
        specification: "Specification 3",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 100, symbol: "USD", isDefault: 0 },
          { value: 4000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "3",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "11",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 11",
        type: "Leptop",
        specification: "Specification 3",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 100, symbol: "USD", isDefault: 0 },
          { value: 4000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "3",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "12",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 12",
        type: "Phone",
        specification: "Specification 3",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 100, symbol: "USD", isDefault: 0 },
          { value: 4000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "3",
        date: "2017-06-29 12:09:33",
      },
    ],
  },
  {
    id: "4",
    title: "Order 4",
    date: "2017-06-29 12:09:33",
    description: "desc",
    products: [
      {
        id: "1",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 1",
        type: "Monitors",
        specification: "Specification 1",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 200, symbol: "USD", isDefault: 0 },
          { value: 8000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "4",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "2",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 2",
        type: "Leptop",
        specification: "Specification 2",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 50, symbol: "USD", isDefault: 0 },
          { value: 2000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "4",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "3",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 3",
        type: "Phone",
        specification: "Specification 3",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 200, symbol: "USD", isDefault: 0 },
          { value: 8000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "4",
        date: "2017-06-29 12:09:33",
      },
      {
        id: "4",
        serialNumber: 1234,
        isNew: 1,
        photo: "pathToFile.jpg",
        title: "Product 4",
        type: "Monitors",
        specification: "Specification 1",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2017-06-29 12:09:33",
        },
        price: [
          { value: 75, symbol: "USD", isDefault: 0 },
          { value: 3000, symbol: "UAH", isDefault: 1 },
        ],
        orderId: "4",
        date: "2017-06-29 12:09:33",
      },
    ],
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Инициализация Firebase...");
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    console.log("📦 Конвертация данных в объект по ID...");
    const ordersObj = {};
    ordersData.forEach((order) => {
      ordersObj[order.id] = order;
    });

    console.log(`📤 Загрузка ${ordersData.length} заказов в Firebase...`);
    await set(ref(database, "orders"), ordersObj);

    console.log("✅ Seed завершен успешно!");
    console.log(`✅ Загружено ${ordersData.length} заказов`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Ошибка при загрузке seed:", error);
    process.exit(1);
  }
}

seedDatabase();
