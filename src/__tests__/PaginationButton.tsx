import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PaginationButton from "../components/PaginationButton";

describe("PaginationButton", () => {
  test("renders children prop", () => {
    render(<PaginationButton>Next</PaginationButton>);
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("calls onClick prop when button is clicked", () => {
    const handleClick = jest.fn();
    render(<PaginationButton onClick={handleClick}>Next</PaginationButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });

  test("adds 'active' class when isActive prop is true", () => {
    render(<PaginationButton isActive>Next</PaginationButton>);
    expect(screen.getByRole("button")).toHaveClass("active");
  });

  test("disables the button when onClick prop is not passed", () => {
    render(<PaginationButton>Next</PaginationButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
