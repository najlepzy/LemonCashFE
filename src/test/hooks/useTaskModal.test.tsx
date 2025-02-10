import { useTaskModal } from "@hooks/index";
import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";

describe("useTaskModal", () => {
  const dummyTask = {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    completed: false,
    createdAt: "2021-01-01",
    status: "PENDING",
  };

  const tasks = { "1": dummyTask };

  let createTask: jest.Mock | any;
  let updateTask: jest.Mock | any;
  let addTaskToColumn: jest.Mock | any;

  beforeEach(() => {
    createTask = vi.fn();
    updateTask = vi.fn();
    addTaskToColumn = vi.fn();
  });

  const setup = () => {
    const props = { tasks, createTask, updateTask, addTaskToColumn };
    return renderHook(() => useTaskModal(props));
  };

  it("opens modal for creating a new task", () => {
    const { result } = setup();

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.isEditingTask).toBe(false);
    expect(result.current.editTaskId).toBe(null);
    expect(result.current.titleInput).toBe("");
    expect(result.current.descInput).toBe("");
  });

  it("opens modal for editing an existing task", () => {
    const { result } = setup();

    act(() => {
      result.current.openModal("1");
    });

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.isEditingTask).toBe(true);
    expect(result.current.editTaskId).toBe("1");
    expect(result.current.titleInput).toBe(dummyTask.title);
    expect(result.current.descInput).toBe(dummyTask.description);
  });

  it("closes modal and resets state", () => {
    const { result } = setup();

    act(() => {
      result.current.openModal("1");
    });
    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.titleInput).toBe("");
    expect(result.current.descInput).toBe("");
    expect(result.current.isEditingTask).toBe(false);
    expect(result.current.editTaskId).toBe(null);
  });

  it("saves task in edit mode", async () => {
    const { result } = setup();

    act(() => {
      result.current.openModal("1");
    });

    act(() => {
      result.current.setTitleInput("Updated Title");
      result.current.setDescInput("Updated Description");
    });

    updateTask.mockResolvedValueOnce(undefined);

    await act(async () => {
      await result.current.saveTask();
    });

    expect(updateTask).toHaveBeenCalledWith(
      "1",
      "Updated Title",
      "Updated Description"
    );
    expect(result.current.isModalOpen).toBe(false);
  });

  it("saves task in create mode", async () => {
    const { result } = setup();

    act(() => {
      result.current.openModal();
    });
    act(() => {
      result.current.setTitleInput("New Task");
      result.current.setDescInput("New Description");
    });

    const newTask = {
      id: "2",
      title: "New Task",
      description: "New Description",
    };
    createTask.mockResolvedValueOnce(newTask);

    await act(async () => {
      await result.current.saveTask();
    });

    expect(createTask).toHaveBeenCalledWith("New Task", "New Description");
    expect(addTaskToColumn).toHaveBeenCalledWith("column-1", "2");
    expect(result.current.isModalOpen).toBe(false);
  });
});
