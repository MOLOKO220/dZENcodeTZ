import { render, screen } from "@testing-library/react";
import * as reduxHooks from "react-redux";

import Index from "../pages/index";

// нужно для работы на последней версией redux
const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

describe("Index", () => {
  it("Index render", () => {
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue([
      {
        id: 1,
        title: "Order1",
        date: "29.06.2017",
        description: "string",
        products: [],
      },
    ]);

    render(<Index />);
    expect(screen.getByText("Приходы / 1")).toBeInTheDocument();
  });
});
