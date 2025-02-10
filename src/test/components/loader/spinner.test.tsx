import Spinner from "@components/loader/spinner";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Spinner", () => {
  it("renders overlay and spinner", () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector(".global-spinner-overlay")).toBeTruthy();
    expect(container.querySelector(".global-spinner")).toBeTruthy();
  });
});
