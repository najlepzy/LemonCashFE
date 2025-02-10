import PublicRoute from "@guard/public/public";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const Public = () => <div>Public</div>;

test("clears token and renders outlet", () => {
  localStorage.setItem("token", "dummy");
  localStorage.setItem("tokenExpiry", "someExpiry");
  render(
    <MemoryRouter initialEntries={["/public"]}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/public" element={<Public />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText("Public")).toBeInTheDocument();
  expect(localStorage.getItem("token")).toBeNull();
  expect(localStorage.getItem("tokenExpiry")).toBeNull();
});
