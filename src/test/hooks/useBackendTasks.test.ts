import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { fetchTasks } from "@services/task.service";
import { useBackendTasks } from "@hooks/index";

vi.mock("@services/task.service", () => ({
  fetchTasks: vi.fn(),
}));

describe("useBackendTasks", () => {
  let setTasks: any, setColumns: any;
  const userId = 1;

  beforeEach(() => {
    setTasks = vi.fn();
    setColumns = vi.fn();
    vi.clearAllMocks();
  });

  it("fetches tasks and sets tasks and columns when response is valid", async () => {
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
    (fetchTasks as any).mockResolvedValue({ data: backendTasks });
    renderHook(() =>
      useBackendTasks({
        isCollaborator: false,
        collaborationOwnerId: null,
        userId,
        setTasks,
        setColumns,
      })
    );
    await waitFor(() => {
      expect(fetchTasks).toHaveBeenCalledWith(userId);
    });
    expect(setTasks).toHaveBeenCalledWith({
      "1": {
        id: "1",
        title: "Task1",
        description: "Desc1",
        completed: false,
        createdAt: "date1",
        status: "TODO",
      },
      "2": {
        id: "2",
        title: "Task2",
        description: "Desc2",
        completed: false,
        createdAt: "date2",
        status: "IN_PROGRESS",
      },
      "3": {
        id: "3",
        title: "Task3",
        description: "Desc3",
        completed: true,
        createdAt: "date3",
        status: "DONE",
      },
    });
    expect(setColumns).toHaveBeenCalledWith({
      "column-1": { id: "column-1", title: "To Do", taskIds: ["1"] },
      "column-2": { id: "column-2", title: "In Progress", taskIds: ["2"] },
      "column-3": { id: "column-3", title: "Done", taskIds: ["3"] },
    });
  });

  it("handles error in fetchTasks", async () => {
    const error = new Error("fail");
    (fetchTasks as any).mockRejectedValue(error);
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    renderHook(() =>
      useBackendTasks({
        isCollaborator: false,
        collaborationOwnerId: null,
        userId,
        setTasks,
        setColumns,
      })
    );
    await waitFor(() => {
      expect(fetchTasks).toHaveBeenCalled();
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching tasks from backend:",
      error
    );
    consoleSpy.mockRestore();
  });
});
