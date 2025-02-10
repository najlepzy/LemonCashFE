import { renderHook, act } from "@testing-library/react";
import { vi, type Mock } from "vitest";

vi.mock("@services/task.service", () => ({
  createTask: vi.fn(),
  updateTask: vi.fn(),
  updateTaskStatus: vi.fn(),
  deleteTask: vi.fn(),
  toggleTaskCompletion: vi.fn(),
}));

vi.mock("@config/taskToast", () => ({
  taskToast: vi.fn(),
}));

import {
  createTask as createTaskAPI,
  updateTask as updateTaskAPI,
  updateTaskStatus as updateTaskStatusAPI,
  deleteTask as deleteTaskAPI,
  toggleTaskCompletion as toggleTaskCompletionAPI,
} from "@services/task.service";
import { taskToast } from "@config/taskToast";
import { useTasks } from "@hooks/index";

describe("useTasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with empty tasks", () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toEqual({});
  });

  it("creates a new task", async () => {
    const { result } = renderHook(() => useTasks());

    // Define a fake backend response
    const backendTask = {
      id: 1,
      title: "Test Task",
      description: "Test description",
      status: "PENDING",
      createdAt: "2025-02-10",
    };

    // Cast to unknown then to Mock to satisfy TypeScript
    (createTaskAPI as unknown as Mock).mockResolvedValue({ data: backendTask });

    let newTask;
    await act(async () => {
      newTask = await result.current.createTask(
        "Test Task",
        "Test description"
      );
    });

    expect(newTask).toEqual({
      id: "1",
      title: "Test Task",
      description: "Test description",
      completed: false, 
      createdAt: "2025-02-10",
      status: "PENDING",
    });
    expect(result.current.tasks).toHaveProperty("1", newTask);
  });

  it("updates a task", async () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setTasks({
        "1": {
          id: "1",
          title: "Old Title",
          description: "Old Description",
          completed: false,
          createdAt: "2025-02-09",
          status: "PENDING",
        },
      });
    });

    (updateTaskAPI as unknown as Mock).mockResolvedValue({});

    await act(async () => {
      await result.current.updateTask("1", "New Title", "New Description");
    });

    expect(updateTaskAPI).toHaveBeenCalledWith("1", {
      title: "New Title",
      description: "New Description",
    });
    expect(result.current.tasks["1"].title).toBe("New Title");
    expect(result.current.tasks["1"].description).toBe("New Description");
    expect(taskToast).toHaveBeenCalledWith({
      type: "success",
      message: "Task updated successfully.",
    });
  });

  it("deletes a task", async () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setTasks({
        "1": {
          id: "1",
          title: "Task to delete",
          description: "Delete me",
          completed: false,
          createdAt: "2025-02-09",
          status: "PENDING",
        },
      });
    });

    (deleteTaskAPI as unknown as Mock).mockResolvedValue({});

    await act(async () => {
      await result.current.deleteTask("1");
    });

    expect(deleteTaskAPI).toHaveBeenCalledWith("1");
    expect(result.current.tasks).not.toHaveProperty("1");
    expect(taskToast).toHaveBeenCalledWith({
      type: "success",
      message: "Task deleted successfully.",
    });
  });

  it("toggles task completion", async () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setTasks({
        "1": {
          id: "1",
          title: "Task to toggle",
          description: "Toggle me",
          completed: false,
          createdAt: "2025-02-09",
          status: "PENDING",
        },
      });
    });

    (toggleTaskCompletionAPI as unknown as Mock).mockResolvedValue({});

    await act(async () => {
      await result.current.toggleTaskCompletion("1", true);
    });

    expect(toggleTaskCompletionAPI).toHaveBeenCalledWith("1", true);
    expect(result.current.tasks["1"].completed).toBe(true);
    expect(taskToast).toHaveBeenCalledWith({
      type: "success",
      message: "Task completion toggled successfully.",
    });
  });

  it("updates task status when status is different", async () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setTasks({
        "1": {
          id: "1",
          title: "Task status test",
          description: "Test status update",
          completed: false,
          createdAt: "2025-02-09",
          status: "PENDING",
        },
      });
    });

    (updateTaskStatusAPI as unknown as Mock).mockResolvedValue({});

    await act(async () => {
      await result.current.updateTaskStatus("1", "DONE");
    });

    expect(updateTaskStatusAPI).toHaveBeenCalledWith("1", "DONE");
    expect(result.current.tasks["1"].status).toBe("DONE");
    expect(result.current.tasks["1"].completed).toBe(true);
    expect(taskToast).toHaveBeenCalledWith({
      type: "success",
      message: "Task status updated successfully.",
    });
  });

  it("does not update task status if the new status is the same", async () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setTasks({
        "1": {
          id: "1",
          title: "Task same status test",
          description: "Test same status update",
          completed: false,
          createdAt: "2025-02-09",
          status: "PENDING",
        },
      });
    });

    await act(async () => {
      await result.current.updateTaskStatus("1", "PENDING");
    });

    expect(updateTaskStatusAPI).not.toHaveBeenCalled();
    expect(taskToast).not.toHaveBeenCalled();
  });
});
