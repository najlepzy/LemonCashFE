import CollaboratorInviteModal from "@components/collab/collaboratorInviteModal";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("CollaboratorInviteModal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  const props = {
    ownerName: "Owner",
    onAccept: vi.fn(),
    onReject: vi.fn(),
  };

  it("renders title and message", () => {
    render(<CollaboratorInviteModal {...props} />);
    expect(screen.getByText(/invite/i)).toBeTruthy();
  });

  it("calls onAccept when accept button is clicked", () => {
    render(<CollaboratorInviteModal {...props} />);
    const acceptButton = screen.getByRole("button", {
      name: /accept invitation/i,
    });
    fireEvent.click(acceptButton);
    expect(props.onAccept).toHaveBeenCalled();
  });

  it("calls onReject when reject button is clicked", () => {
    render(<CollaboratorInviteModal {...props} />);
    const rejectButton = screen.getByRole("button", {
      name: /reject invitation/i,
    });
    fireEvent.click(rejectButton);
    expect(props.onReject).toHaveBeenCalled();
  });

  it("calls onReject after timeout", () => {
    render(<CollaboratorInviteModal {...props} />);
    vi.advanceTimersByTime(10000);
    expect(props.onReject).toHaveBeenCalled();
  });
});
