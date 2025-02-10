import { renderHook, act, waitFor } from "@testing-library/react";
import { fetchCollaborators, createCollaborator, deleteCollaborator } from "@services/task.service";
import { showToast } from "@config/collabToast";
import { useCollaborators } from "@hooks/index";

vi.mock("@services/task.service", () => ({
  fetchCollaborators: vi.fn(),
  createCollaborator: vi.fn(),
  deleteCollaborator: vi.fn(),
}));
vi.mock("@config/collabToast", () => ({
  showToast: vi.fn(),
}));

describe("useCollaborators", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads collaborators on mount", async () => {
    const collaboratorsData = [{ id: "1", email: "test@example.com" }];
    (fetchCollaborators as any).mockResolvedValue({ data: collaboratorsData });
    const { result } = renderHook(() => useCollaborators());
    await waitFor(() => {
      expect(result.current.collaborators).toEqual([{ id: "1", name: "test@example.com" }]);
    });
  });

  it("adds collaborator successfully", async () => {
    (createCollaborator as any).mockResolvedValue({});
    const { result } = renderHook(() => useCollaborators());
    await act(async () => {
      await result.current.addCollaborator("user@example.com");
    });
    expect(createCollaborator).toHaveBeenCalledWith({ identifier: "user@example.com" });
    expect(showToast).toHaveBeenCalledWith("success", "Invitation sent to the collaborator!");
  });

  it("handles error when adding collaborator", async () => {
    (createCollaborator as any).mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useCollaborators());
    await act(async () => {
      await result.current.addCollaborator("user@example.com");
    });
    expect(showToast).toHaveBeenCalledWith("error", "Error adding collaborator");
  });

  it("removes collaborator successfully", async () => {
    (deleteCollaborator as any).mockResolvedValue({});
    const { result } = renderHook(() => useCollaborators());
    act(() => {
      result.current.setCollaborators([{ id: "1", name: "test@example.com" }]);
    });
    await act(async () => {
      await result.current.removeCollaborator("1");
    });
    expect(deleteCollaborator).toHaveBeenCalledWith("1");
    expect(showToast).toHaveBeenCalledWith("success", "Collaborator removed successfully");
    expect(result.current.collaborators).toEqual([]);
  });

  it("handles error when removing collaborator", async () => {
    (deleteCollaborator as any).mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useCollaborators());
    await act(async () => {
      await result.current.removeCollaborator("1");
    });
    expect(showToast).toHaveBeenCalledWith("error", "Error removing collaborator");
  });
});
