import { render, screen, waitFor } from "@testing-library/react";

import { vi } from "vitest";
import React, { lazy, LazyExoticComponent } from "react";
import { JSX } from "react/jsx-runtime";

vi.mock("@components/loader/spinner", () => () => (
  <div data-testid="spinner">Loading...</div>
));

const DummyComponent = () => <div>Dummy Component</div>;
const LazyDummy = lazy(() => Promise.resolve({ default: DummyComponent }));
const WrappedDummy = withSuspense(LazyDummy);

describe("withSuspense", () => {
  it("renders fallback then the component", async () => {
    render(<WrappedDummy />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("Dummy Component")).toBeInTheDocument()
    );
  });
});
function withSuspense(LazyDummy: LazyExoticComponent<() => JSX.Element>) {
    return function WithSuspense() {
        return (
            <React.Suspense fallback={<div data-testid="spinner">Loading...</div>}>
                <LazyDummy />
            </React.Suspense>
        );
    };
}

