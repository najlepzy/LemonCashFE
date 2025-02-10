import { renderHook, act } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import { fetchTasks, leaveCollaboration } from "@services/task.service";
import { showToast } from "@config/collabToast";
import useExitCollaboration from "@hooks/useExitCollaboration";

vi.mock("@services/task.service", () => ({
  fetchTasks: vi.fn(),
  leaveCollaboration: vi.fn(),
}));
vi.mock("@config/collabToast", () => ({
  showToast: vi.fn(),
}));

describe("useExitCollaboration", () => {
  let setTasks: any,
    setColumns: any,
    setIsCollaborator: any,
    setCollaborationOwnerId: any,
    setCollabOwnerName: any;
  const currentUserId = 1;
  const collaborationOwnerId = 123;

  beforeEach(() => {
    setTasks = vi.fn();
    setColumns = vi.fn();
    setIsCollaborator = vi.fn();
    setCollaborationOwnerId = vi.fn();
    setCollabOwnerName = vi.fn();
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("exits collaboration successfully when collaborator", async () => {
    (leaveCollaboration as unknown as Mock).mockResolvedValue({});
    const backendTasks = [
      {
        id: 1,
        title: "Task1",
        description: "Desc1",
        status: "TODO",
        createdAt: "date1",
      },
      {
        id: 2,
        title: "Task2",
        description: "Desc2",
        status: "IN_PROGRESS",
        createdAt: "date2",
      },
      {
        id: 3,
        title: "Task3",
        description: "Desc3",
        status: "DONE",
        createdAt: "date3",
      },
    ];
    (fetchTasks as unknown as Mock).mockResolvedValue({ data: backendTasks });
    const { result } = renderHook(() =>
      useExitCollaboration({
        isCollaborator: true,
        collaborationOwnerId,
        currentUserId,
        setTasks,
        setColumns,
        setIsCollaborator,
        setCollaborationOwnerId,
        setCollabOwnerName,
      })
    );
    await act(async () => {
      await result.current();
    });
    expect(leaveCollaboration).toHaveBeenCalledWith(collaborationOwnerId);
    expect(setIsCollaborator).toHaveBeenCalledWith(false);
    expect(setCollaborationOwnerId).toHaveBeenCalledWith(null);
    expect(setCollabOwnerName).toHaveBeenCalledWith(null);
    expect(setTasks).toHaveBeenCalled();
    expect(setColumns).toHaveBeenCalled();
    expect(showToast).toHaveBeenCalledWith(
      "success",
      "You have left the collaboration"
    );
  });

  it("exits collaboration when not a collaborator", async () => {
    const backendTasks: any[] = [];
    (fetchTasks as unknown as Mock).mockResolvedValue({ data: backendTasks });
    const { result } = renderHook(() =>
      useExitCollaboration({
        isCollaborator: false,
        collaborationOwnerId: null,
        currentUserId,
        setTasks,
        setColumns,
        setIsCollaborator,
        setCollaborationOwnerId,
        setCollabOwnerName,
      })
    );
    await act(async () => {
      await result.current();
    });
    expect(leaveCollaboration).not.toHaveBeenCalled();
    expect(setIsCollaborator).toHaveBeenCalledWith(false);
    expect(setCollaborationOwnerId).toHaveBeenCalledWith(null);
    expect(setCollabOwnerName).toHaveBeenCalledWith(null);
    expect(setTasks).toHaveBeenCalledWith({});
    expect(setColumns).toHaveBeenCalled();
    expect(showToast).toHaveBeenCalledWith(
      "success",
      "You have left the collaboration"
    );
  });

  it("handles error in leaveCollaboration", async () => {
    (leaveCollaboration as unknown as Mock).mockRejectedValue(
      new Error("fail")
    );
    const backendTasks: any[] = [];
    (fetchTasks as unknown as Mock).mockResolvedValue({ data: backendTasks });
    const { result } = renderHook(() =>
      useExitCollaboration({
        isCollaborator: true,
        collaborationOwnerId,
        currentUserId,
        setTasks,
        setColumns,
        setIsCollaborator,
        setCollaborationOwnerId,
        setCollabOwnerName,
      })
    );
    await act(async () => {
      await result.current();
    });
    expect(leaveCollaboration).toHaveBeenCalledWith(collaborationOwnerId);
    expect(setIsCollaborator).toHaveBeenCalledWith(false);
    expect(setCollaborationOwnerId).toHaveBeenCalledWith(null);
    expect(setCollabOwnerName).toHaveBeenCalledWith(null);
    expect(showToast).toHaveBeenCalledWith(
      "success",
      "You have left the collaboration"
    );
  });

  it("handles error in fetchTasks", async () => {
    (leaveCollaboration as unknown as Mock).mockResolvedValue({});
    (fetchTasks as unknown as Mock).mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() =>
      useExitCollaboration({
        isCollaborator: true,
        collaborationOwnerId,
        currentUserId,
        setTasks,
        setColumns,
        setIsCollaborator,
        setCollaborationOwnerId,
        setCollabOwnerName,
      })
    );
    await act(async () => {
      await result.current();
    });
    expect(leaveCollaboration).toHaveBeenCalledWith(collaborationOwnerId);
    expect(setIsCollaborator).toHaveBeenCalledWith(false);
    expect(setCollaborationOwnerId).toHaveBeenCalledWith(null);
    expect(setCollabOwnerName).toHaveBeenCalledWith(null);
    expect(showToast).not.toHaveBeenCalledWith(
      "success",
      "You have left the collaboration"
    );
  });
});
