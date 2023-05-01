import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Card } from "../components/CharacterTile";
import { Provider } from "react-redux";
import store from "../store";
import { MemoryRouter } from "react-router-dom";

describe("Card component", () => {
  const props = {
    imageUrl: "https://example.com/image.jpg",
    name: "Luke Skywalker",
    id: "1",
    type: "characters",
    isFavourited: false,
  };

  test("renders image, name, and favourite button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card
            imageUrl="https://example.com/image.jpg"
            name="Luke Skywalker"
            id="1"
            type="characters"
            isFavourited={false}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(`Images of ${props.name}`)).toBeInTheDocument();
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
