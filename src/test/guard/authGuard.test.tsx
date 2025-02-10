import AuthGuard from "@guard/authWall";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const Protected = () => <div>Protected</div>;
const AuthPage = () => <div>Auth Page</div>;

test("redirects to /auth if not authenticated", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
  render(
    <MemoryRouter initialEntries={["/protected"]}>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/protected" element={<Protected />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText("Auth Page")).toBeInTheDocument();
});

test("renders outlet if authenticated", () => {
  localStorage.setItem("token", "dummy");
  const futureDate = new Date(Date.now() + 1000000).toISOString();
  localStorage.setItem("tokenExpiry", futureDate);
  render(
    <MemoryRouter initialEntries={["/protected"]}>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/protected" element={<Protected />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText("Protected")).toBeInTheDocument();
});

test("removes expired token and redirects to /auth", () => {
  localStorage.setItem("token", "dummy");
  const pastDate = new Date(Date.now() - 1000000).toISOString();
  localStorage.setItem("tokenExpiry", pastDate);
  render(
    <MemoryRouter initialEntries={["/protected"]}>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/protected" element={<Protected />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText("Auth Page")).toBeInTheDocument();
});
