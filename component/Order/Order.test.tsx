import { render, screen } from "@testing-library/react";
import Order from "./Order";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

describe("Order", () => {
  it("render", () => {
    render(
      <Order
        data={{
          id: 2,
          title: "Order1",
          date: "03.11.2017",
          description: "string",
          products: [],
        }}
      />
    );

    expect(
      screen.getByText("Вы уверены, что хотите удалить этот приход?")
    ).toBeInTheDocument();
  });

  it("date", () => {
    render(
      <Order
        data={{
          id: 2,
          title: "Order1",
          date: "03.11.2017",
          description: "string",
          products: [],
        }}
      />
    );

    expect(screen.getByText("11/март/2017")).toBeInTheDocument();
  });

  it("snapshots", () => {
    const component = render(
      <Order
        data={{
          id: 2,
          title: "Order1",
          date: "03.11.2017",
          description: "string",
          products: [],
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
