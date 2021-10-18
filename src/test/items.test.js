import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Items from "../items";

import { mount, shallow } from "enzyme";
const editor = require("../editor.js").default;

describe("Filter function", () => {
  test("creat an item", () => {
    render(<Items />);
    expect(() => render(<Items />)).toBeTruthy();
    const createButton = screen.getByText("My Editor");
    expect(createButton).toHaveTextContent("My Editor");
  });

  // test("save test button", () => {
  //   const wrapper = shallow(<Items />);
  //   wrapper.find()
  //   expect(wrapper.state('postData')).toBe(0);

  //   // const createButton = screen.getByTestId("save-button");
  //   // fireEvent.click(createButton);
  //   // expect(wrapper.count).toBe(0);
  // });

  test("should show items", () => {
    const itemsWrapper = render(<Items />);
    expect(itemsWrapper).toMatchSnapshot();
  });

  test("should show items", () => {
    const itemsWrapper = render(<Items />);
    expect(itemsWrapper).toMatchSnapshot();

    const showButton = screen.getByTestId("show-button");
    fireEvent(
      showButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(itemsWrapper).toMatchSnapshot();
  });
});
