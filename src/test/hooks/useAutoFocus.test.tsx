import { render } from "@testing-library/react";
import { useAutoFocus } from "@hooks/index";
import { vi } from "vitest";

describe("useAutoFocus", () => {
  let focusSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    focusSpy = vi
      .spyOn(HTMLInputElement.prototype, "focus")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    focusSpy.mockRestore();
  });

  const DummyComponent = ({ shouldFocus }: { shouldFocus: boolean }) => {
    const inputRef = useAutoFocus(shouldFocus);
    return <input ref={inputRef} data-testid="input" />;
  };

  it("calls focus when shouldFocus is true", () => {
    const { rerender } = render(<DummyComponent shouldFocus={false} />);
    expect(focusSpy).not.toHaveBeenCalled();

    rerender(<DummyComponent shouldFocus={true} />);
    expect(focusSpy).toHaveBeenCalled();
  });

  it("does not call focus again when shouldFocus becomes false", () => {
    const { rerender } = render(<DummyComponent shouldFocus={true} />);
    expect(focusSpy).toHaveBeenCalledTimes(1);

    rerender(<DummyComponent shouldFocus={false} />);
    expect(focusSpy).toHaveBeenCalledTimes(1);
  });
});
