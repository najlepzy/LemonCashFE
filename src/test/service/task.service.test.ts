import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import axios from "@api/axios";
import { signIn, signUp } from "@services/auth.service";

vi.mock("@api/axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("Auth Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should sign in a user", async () => {
    const signInPayload = {
      email: "test@example.com",
      password: "password123",
    };
    const mockResponse = {
      token: "jwt-token",
      user: { id: 1, email: "test@example.com" },
    };

    (axios.post as Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await signIn(signInPayload);

    expect(axios.post).toHaveBeenCalledWith(
      import.meta.env.VITE_AUTH_LOGIN,
      signInPayload
    );
    expect(result).toEqual(mockResponse);
  });

  it("should sign up a user", async () => {
    const signUpPayload = {
      username: "Test User",
      email: "newuser@example.com",
      password: "password123",
    };
    const mockResponse = {
      message: "User registered successfully",
      user: { id: 2, email: "newuser@example.com" },
    };

    (axios.post as Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await signUp(signUpPayload);

    expect(axios.post).toHaveBeenCalledWith(
      import.meta.env.VITE_AUTH_REGISTER,
      signUpPayload
    );
    expect(result).toEqual(mockResponse);
  });
});
