import { useCollaboratorModal } from "@hooks/index";
import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";

describe("useCollaboratorModal", () => {
  const addCollaborator = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("opens collaborator modal", () => {
    const { result } = renderHook(() => useCollaboratorModal({ addCollaborator }));
    act(() => {
      result.current.openCollaboratorModal();
    });
    expect(result.current.isCollaboratorModalOpen).toBe(true);
    expect(result.current.collaboratorInput).toBe("");
  });

  it("closes collaborator modal", () => {
    const { result } = renderHook(() => useCollaboratorModal({ addCollaborator }));
    act(() => {
      result.current.openCollaboratorModal();
    });
    act(() => {
      result.current.closeCollaboratorModal();
    });
    expect(result.current.isCollaboratorModalOpen).toBe(false);
    expect(result.current.collaboratorInput).toBe("");
  });

  it("saves collaborator and closes modal", () => {
    const { result } = renderHook(() => useCollaboratorModal({ addCollaborator }));
    act(() => {
      result.current.openCollaboratorModal();
    });
    act(() => {
      result.current.setCollaboratorInput("user@example.com");
    });
    expect(result.current.collaboratorInput).toBe("user@example.com");
    act(() => {
      result.current.saveCollaborator();
    });
    expect(addCollaborator).toHaveBeenCalledWith("user@example.com");
    expect(result.current.isCollaboratorModalOpen).toBe(false);
    expect(result.current.collaboratorInput).toBe("");
  });
});
