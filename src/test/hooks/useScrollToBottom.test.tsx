import { useScrollToBottom } from "@hooks/index";
import { renderHook } from "@testing-library/react";
import { vi, type Mock } from "vitest";

describe("useScrollToBottom", () => {
  it("calls scrollTo with (0, scrollHeight) when dependency changes", () => {
    const fakeElement = {
      scrollTo: vi.fn(),
      scrollHeight: 150,
    } as unknown as HTMLElement;
    const ref = { current: fakeElement };
    const { rerender } = renderHook(({ dep }) => useScrollToBottom(ref, dep), {
      initialProps: { dep: 1 },
    });
    expect(fakeElement.scrollTo).toHaveBeenCalledWith(0, 150);
    (fakeElement.scrollTo as unknown as Mock).mockClear();
    rerender({ dep: 2 });
    expect(fakeElement.scrollTo).toHaveBeenCalledWith(0, 150);
  });
});
