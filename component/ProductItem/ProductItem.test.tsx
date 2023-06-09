import { render, screen } from "@testing-library/react";

import ProductItem from "./ProductItem";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

describe("ProductItem", () => {
  beforeEach(() => {
    jest.clearAllMocks;
  });

  it("render", () => {
    render(
      <ProductItem
        date="2017-06-29 12:09:33"
        guaranteeEnd="2017-06-29 12:09:33"
        guaranteeSart="2017-06-29 12:09:33"
        id={1}
        img="pathToFile.jpg"
        orderTitle="Order 1"
        orderId={3}
        title="Product 1"
        type="Monitors"
        priceUSD={200}
        priceUAH={8000}
        specification="Specification 1"
      />
    );
    expect(screen.getByText(/Monitors/i)).toBeInTheDocument();
    expect(screen.getByText(/Specification 1/i)).toBeInTheDocument();
    expect(screen.getByText(/8000 UAH/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Вы уверены, что хотите удалить этот приход?/i)
    ).toBeInTheDocument();
  });

  it("fn Date", () => {
    render(
      <ProductItem
        date="2017-06-29 12:09:33"
        guaranteeEnd="2017-06-29 12:09:33"
        guaranteeSart="2017-06-29 12:09:33"
        id={1}
        img="pathToFile.jpg"
        orderTitle="Order 1"
        orderId={3}
        title="Product 1"
        type="Monitors"
        priceUSD={200}
        priceUAH={8000}
        specification="Specification 1"
      />
    );
    expect(screen.getByText("29/06")).toBeInTheDocument();
    expect(screen.getByText("29/июнь/2017")).toBeInTheDocument();
  });
});
