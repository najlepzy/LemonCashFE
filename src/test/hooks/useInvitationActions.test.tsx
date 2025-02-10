import { renderHook, act } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import {
  acceptCollaboratorInvitation,
  rejectCollaboratorInvitation,
} from "@services/task.service";
import { showToast } from "@config/collabToast";
import { useInvitationActions } from "@hooks/index";

vi.mock("@services/task.service", () => ({
  acceptCollaboratorInvitation: vi.fn(),
  rejectCollaboratorInvitation: vi.fn(),
}));
vi.mock("@config/collabToast", () => ({
  showToast: vi.fn(),
}));

describe("useInvitationActions", () => {
  const collabInvite = { ownerId: 123, ownerName: "Test Owner" };
  let setIsCollaborator: React.Dispatch<React.SetStateAction<boolean>>,
    setCollaborationOwnerId: React.Dispatch<
      React.SetStateAction<number | null>
    >,
    setCollabOwnerName: React.Dispatch<React.SetStateAction<string | null>>,
    setCollabInvite: React.Dispatch<React.SetStateAction<any>>;
  beforeEach(() => {
    setIsCollaborator = vi.fn() as unknown as React.Dispatch<
      React.SetStateAction<boolean>
    >;
    setCollaborationOwnerId = vi.fn() as unknown as React.Dispatch<
      React.SetStateAction<number | null>
    >;
    setCollabOwnerName = vi.fn() as unknown as React.Dispatch<
      React.SetStateAction<string | null>
    >;
    setCollabInvite = vi.fn() as unknown as React.Dispatch<
      React.SetStateAction<any>
    >;
    vi.clearAllMocks();
  });
  it("accepts invitation successfully", async () => {
    (acceptCollaboratorInvitation as unknown as Mock).mockResolvedValue({});
    const { result } = renderHook(() =>
      useInvitationActions({
        collabInvite,
        setIsCollaborator,
        setCollaborationOwnerId,
        setCollabOwnerName,
        setCollabInvite,
      })
    );
    await act(async () => {
      await result.current.acceptInvite();
    });
    expect(acceptCollaboratorInvitation).toHaveBeenCalledWith(
      collabInvite.ownerId
    );
    expect(setIsCollaborator).toHaveBeenCalledWith(true);
    expect(setCollaborationOwnerId).toHaveBeenCalledWith(collabInvite.ownerId);
    expect(setCollabOwnerName).toHaveBeenCalledWith(collabInvite.ownerName);
    expect(setCollabInvite).toHaveBeenCalledWith(null);
    expect(showToast).toHaveBeenCalledWith(
      "success",
      `You have accepted the invitation from ${collabInvite.ownerName}. You are now a collaborator and can move tasks to update their status.`
    );
  });
  it("handles error on accept invitation", async () => {
    (acceptCollaboratorInvitation as unknown as Mock).mockRejectedValue(
      new Error("fail")
    );
    const { result } = renderHook(() =>
      useInvitationActions({
        collabInvite,
        setIsCollaborator,
        setCollaborationOwnerId,
        setCollabOwnerName,
        setCollabInvite,
      })
    );
    await act(async () => {
      await result.current.acceptInvite();
    });
    expect(showToast).toHaveBeenCalledWith(
      "error",
      "Failed to accept the invitation"
    );
  });
  it("rejects invitation successfully", async () => {
    (rejectCollaboratorInvitation as unknown as Mock).mockResolvedValue({});
    const { result } = renderHook(() =>
      useInvitationActions({
        collabInvite,
        setIsCollaborator,
        setCollaborationOwnerId,
        setCollabOwnerName,
        setCollabInvite,
      })
    );
    await act(async () => {
      await result.current.rejectInvite();
    });
    expect(rejectCollaboratorInvitation).toHaveBeenCalledWith(
      collabInvite.ownerId
    );
    expect(setCollabInvite).toHaveBeenCalledWith(null);
    expect(showToast).toHaveBeenCalledWith(
      "info",
      "You have rejected the invitation"
    );
  });
  it("handles error on reject invitation", async () => {
    (rejectCollaboratorInvitation as unknown as Mock).mockRejectedValue(
      new Error("fail")
    );
    const { result } = renderHook(() =>
      useInvitationActions({
        collabInvite,
        setIsCollaborator,
        setCollaborationOwnerId,
        setCollabOwnerName,
        setCollabInvite,
      })
    );
    await act(async () => {
      await result.current.rejectInvite();
    });
    expect(showToast).toHaveBeenCalledWith(
      "error",
      "Failed to reject the invitation"
    );
  });
});
