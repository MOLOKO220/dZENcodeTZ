import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it(" render", () => {
    render(<Header />);
    expect(screen.getByText(/INVENTORY/i)).toBeInTheDocument();
  });
});
