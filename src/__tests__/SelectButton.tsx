import { render, fireEvent, screen } from "@testing-library/react";
import SelectButton from "../components/SelectButton";

describe("SelectButton", () => {
  it("should render the provided children", () => {
    render(<SelectButton isSelected={false}>Click me!</SelectButton>);
    expect(screen.getByText("Click me!")).toBeInTheDocument();
  });

  it("should have the 'selected' class if isSelected prop is true", () => {
    render(<SelectButton isSelected={true}>Click me!</SelectButton>);
    expect(screen.getByRole("button")).toHaveClass("selected");
  });

  it("should not have the 'selected' class if isSelected prop is false", () => {
    render(<SelectButton isSelected={false}>Click me!</SelectButton>);
    expect(screen.getByRole("button")).not.toHaveClass("selected");
  });

  it("should call onClick function when clicked", () => {
    const handleClick = jest.fn();
    render(
      <SelectButton isSelected={false} onClick={handleClick}>
        Click me!
      </SelectButton>
    );
    fireEvent.click(screen.getByText("Click me!"));
    expect(handleClick).toHaveBeenCalled();
  });
});
