import { render, screen } from "@testing-library/react";
import NuvMenu from "./NuvMenu";

describe("NuvMenu", () => {
  it(" render", () => {
    render(<NuvMenu />);
    expect(screen.getByText(/ПРИХОД/i)).toBeInTheDocument();
    expect(screen.getByText(/ГРУППЫ/i)).toBeInTheDocument();
    expect(screen.getByText(/ПРОДУКТЫ/i)).toBeInTheDocument();
    expect(screen.getByText(/ПОЛЬЗОВАТЕЛИ/i)).toBeInTheDocument();
    expect(screen.getByText(/НАСТРОЙКИ/i)).toBeInTheDocument();
  });

  it("snapshots", () => {
    const component = render(<NuvMenu />);
    expect(component).toMatchSnapshot();
  });
});
