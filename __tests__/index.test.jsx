import Page from "../src/pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Test Test", () => {
    it("Is it working", () => {
      render(<Page />);
      // Screen contain 'hello'
      screen.getByText('hello');
    });
  });