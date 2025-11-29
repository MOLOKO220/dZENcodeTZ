export interface PriceType {
  value: number;
  symbol: string;
  isDefault?: number;
}

export interface GuaranteeType {
  start: string;
  end: string;
}

export interface ProductType {
  id: string;
  serialNumber?: number;
  isNew?: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: GuaranteeType;
  price: PriceType[];
  orderId: string;
  date: string;
}

export interface OrderType {
  id: string;
  title: string;
  date: string;
  description: string;
  products: ProductType[];
}

export interface StoreType {
  orders: OrderType[];
  searchOrderTerm: string;
  searchProductTerm: string;
  loading?: boolean;
}
