import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet } from "react-router-dom";
import AppRoutes from "@routes/app.routes";

vi.mock("@pages/auth", () => {
  return {
    default: () => <div>Auth Page</div>,
  };
});

vi.mock("@pages/taskManager", () => {
  return {
    default: () => <div>TaskManager Page</div>,
  };
});

vi.mock("@guard/public/public", () => {
  return {
    default: () => <Outlet />,
  };
});

vi.mock("@guard/authWall", () => {
  return {
    default: () => <Outlet />,
  };
});

describe("AppRoutes", () => {
  it("renders Auth component on '/auth' route", () => {
    render(
      <MemoryRouter initialEntries={["/auth"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Auth Page")).toBeTruthy();
  });

  it("renders TaskManager component on '/taskmanager' route", () => {
    render(
      <MemoryRouter initialEntries={["/taskmanager"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("TaskManager Page")).toBeTruthy();
  });

  it("redirects unknown route to '/auth'", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Auth Page")).toBeTruthy();
  });
});
